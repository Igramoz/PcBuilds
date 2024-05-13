const jwt = require('jsonwebtoken');

const VerifyToken = (Role) => {

    return (req, res, next) => {
        
        const token = req.cookies.token;

        try {
            const decoded = jwt.verify(token, process.env.SECRET);

            if (decoded.role !== Role && decoded.role !== 'admin') {
                return res.status(403).json({ message: 'Forbidden' });
            }
            
            const { exp, iss} = decoded;

            if (iss === 'pcbuilds' && exp > Date.now() / 1000){
                next();
            }else{
                return res.status(401).json({ message: 'Unauthorized' });
            }

            

            
        }catch (e) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }


}

module.exports = VerifyToken;
