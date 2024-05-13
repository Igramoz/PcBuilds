const  { Router } = require('express');
const connection = require('../db/connection');
const verifyToken = require('../checkToken/CheckToken.js');
const routes = Router();

/*
"id": 0,
    "username_id": "string",
    "build_id": 0
*/

routes.get('/user_builds',verifyToken('user'), async (req, res) => {
    try{

        connection.query('SELECT * FROM user_builds', (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No user builds found"});
            }

            return res.status(200).json(results);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.post('/user_builds',verifyToken('user'), async (req, res) => {
    try{
        const { username_id, build_id } = req.body;

        connection.query('SELECT * FROM users WHERE email = ?', [username_id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "User not found"});
            }

            connection.query('SELECT * FROM builds WHERE id = ?', [build_id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                if (results.length === 0){
                    return res.status(404).json({message: "Build not found"});
                }

                connection.query('INSERT INTO user_builds(user, builds) VALUES(?, ?)', [username_id, build_id], (error, results, fields) => {
                    if (error){
                        return res.status(500).json({message: "Internal server error", error: error});
                    }

                    return res.status(201).json({message: "User build created"});
                });
            });
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.get('/user_builds/:id',verifyToken('user'), async (req, res) => {
    try{
        const { id } = req.params;

        connection.query('SELECT * FROM user_builds WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "User build not found"});
            }

            return res.status(200).json(results[0]);
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.put('/user_builds/:id',verifyToken('user'), async (req, res) => {
    try{
        const { username_id, build_id } = req.body;
        const { id } = req.params;

        connection.query('SELECT * FROM user_builds WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "User build not found"});
            }

            connection.query('SELECT * FROM users WHERE email = ?', [username_id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                if (results.length === 0){
                    return res.status(404).json({message: "User not found"});
                }

                connection.query('SELECT * FROM builds WHERE id = ?', [build_id], (error, results, fields) => {
                    if (error){
                        return res.status(500).json({message: "Internal server error", error: error});
                    }

                    if (results.length === 0){
                        return res.status(404).json({message: "Build not found"});
                    }

                    connection.query('UPDATE user_builds SET username_id = ?, build_id = ? WHERE id = ?', [username_id, build_id, id], (error, results, fields) => {
                        if (error){
                            return res.status(500).json({message: "Internal server error", error: error});
                        }

                        return res.status(200).json({message: "User build updated"});
                    });
                });
            });
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.delete('/user_builds/:id',verifyToken('user'), async (req, res) => {
    try{
        const { id } = req.params;

        connection.query('SELECT * FROM user_builds WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "User build not found"});
            }

            connection.query('DELETE FROM user_builds WHERE id = ?', [id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                return res.status(200).json({message: "User build deleted"});
            });
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.get('/user_builds/user/:email',verifyToken('user'), async (req, res) => {
    try{
        const { email } = req.params;

        connection.query('SELECT * FROM user_builds WHERE user = ?', [email], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "User builds not found"});
            }

            return res.status(200).json(results);
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

module.exports = routes;