const  { Router } = require('express');
const connection = require('../db/connection');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');


async function VerifyGtoken(token, audience){
    const client = new OAuth2Client();
    
    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: audience
        });

        return true;
    }catch(error){
        return false;
    }

    
}

const VerifyToken = (Role) => {

    return (req, res, next) => {
        const { authorization } = req.headers
        const token = authorization.substring('Bearer '.length);
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            if (decoded.role !== Role && Role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }
            next();
        }catch (e) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }


}

function CheckRole(domain){
    if (domain === 'itispaleocapa.it'){
        return 'admin';
    }else{
        return 'user';
    }
}

const routes = Router();

/*
    "email": "string",
    "name": "string",
    "surname": "string",
    "token": "string"
*/

routes.get('/users',VerifyToken('user'), async (req, res) => {
    try{
        connection.query('SELECT * FROM users', (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No users found"});
            }

            return res.status(200).json(results);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.post('/login', async (req, res) => {
    try{
        const { token } = req.body;

        const decoded = jwtDecode(token);

        if(!VerifyGtoken(token, decoded.audience)){
            return res.status(401).json({message: "Unauthorized"});
        };

        //controllo se l'utente è già presente nel db

        connection.query('SELECT * FROM users WHERE email = ?', [decoded.email], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(401).json({message: "User not registered"});
            }

            const role = CheckRole(decoded.hd);

            console.log(role);

            const jwtToken = jwt.sign(
                {
                    mail: decoded.email,
                    role: role,
                },
                process.env.SECRET,
                {
                    expiresIn: '1h',
                    issuer: 'pcbuilds',
                    subject: decoded.email,
                }
            );

            let options = {
                maxAge: 1000 * 60 * 60, // would expire after 1 hour
                httpOnly: true, // Cookie will not be exposed to client side code
                sameSite: 'none', // If client and server origins are different
                path: '/',
                secure: true,
            }

            res.cookie('token', jwtToken, options);

            res.status(200).json({message: "Logged in"});

        });
    }catch(error){
        return res.status(401).json({message: "Unauthorized", error: error});
    }
});

routes.post('/users', async (req, res) => {
    try{
        
        const token = req.body.token;

        const decoded = jwtDecode(token);

        VerifyGtoken(token, decoded.audience);

        

        const { email, name } = decoded;

        const image = decoded.picture;

        connection.query('INSERT INTO users(email, name, image) VALUES(?, ?, ?)', [email, name, image], (error, results, fields) => {
            if (error){
                console.log(error);
                return res.status(500).json({message: "Internal server error", error: error});
            }

            return res.status(201).json({message: "User created"});
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.get('/users/:id',VerifyToken('user') , async (req, res) => {
    try{
        const { id } = req.params;

        connection.query('SELECT * FROM users WHERE email = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "User not found"});
            }

            return res.status(200).json(results);
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.put('/users/:id',VerifyToken('admin') , async (req, res) => {
    try{
        const { name, image, token } = req.body;
        const { id } = req.params;

        connection.query('SELECT * FROM users WHERE email = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "User not found"});
            }

            connection.query('UPDATE users SET name = ?, image = ? token = ? WHERE email = ?', [ name, image, token, id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                return res.status(200).json({message: "User updated"});
            });
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.delete('/users/:id',VerifyToken('admin') , async (req, res) => {
    try{
        const { id } = req.params;

        connection.query('SELECT * FROM users WHERE email = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "User not found"});
            }

            connection.query('DELETE FROM users WHERE email = ?', [id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                return res.status(200).json({message: "User deleted"});
            });
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});



module.exports = routes;