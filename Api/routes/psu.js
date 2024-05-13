const  { Router } = require('express');
const connection = require('../db/connection');
const verifyToken = require('../checkToken/CheckToken.js');
const routes = Router();

/**
 * 
 * "id": 0,
    "watt": 0,
    "models": "string",
    "brand": "string",
    "efficency": "string",
    "name": "string"
 */

routes.get('/components/psu',verifyToken('user'), async (req, res) => {

    try{

        connection.query('SELECT * FROM psu', (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No psus found"});
            }

            return res.status(200).json(results);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.post('/components/psu',verifyToken('admin'), async (req, res) => {
    

    try{

        const { watt, models, brand, efficency, name } = req.body;

        if (watt === undefined || models === undefined || brand === undefined || efficency === undefined || name === undefined){
            return res.status(400).json({message: "Missing required fields"});
        }

        if (isNaN(watt)){
            return res.status(400).json({message: "Invalid watt"});
        }

        //check if others are strings

        if (typeof models !== 'string' || typeof brand !== 'string' || typeof efficency !== 'string' || typeof name !== 'string'){
            return res.status(400).json({message: "Invalid models, brand, efficency or name"});
        }

        connection.query('INSERT INTO psu (watt, models, brand, efficency, name) VALUES (?, ?, ?, ?, ?)', [watt, models, brand, efficency, name], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            return res.status(201).json({message: "Psu created"});
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.get('/components/psu/:id',verifyToken('user'), async (req, res) => {
    try{
            
            const { id } = req.params;
    
            connection.query('SELECT * FROM psu WHERE id = ?', [id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }
    
                if (results.length === 0){
                    return res.status(404).json({message: "Psu not found"});
                }
    
                return res.status(200).json(results[0]);
    
            });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.put('/components/psu/:id',verifyToken('admin'), async (req, res) => {
    try{

        const { watt, models, brand, efficency, name } = req.body;
        const { id } = req.params;

        if (watt === undefined || models === undefined || brand === undefined || efficency === undefined || name === undefined){
            return res.status(400).json({message: "Missing required fields"});
        }

        if (isNaN(watt)){
            return res.status(400).json({message: "Invalid watt"});
        }

        //check if others are strings

        if (typeof models !== 'string' || typeof brand !== 'string' || typeof efficency !== 'string' || typeof name !== 'string'){
            return res.status(400).json({message: "Invalid models, brand, efficency or name"});
        }

        connection.query('UPDATE psu SET watt = ?, models = ?, brand = ?, efficency = ?, name = ? WHERE id = ?', [watt, models, brand, efficency, name, id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.affectedRows === 0){
                return res.status(404).json({message: "Psu not found"});
            }

            return res.status(200).json(results[0]);
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.delete('/components/psu/:id',verifyToken('admin'), async (req, res) => {
    try{

        const { id } = req.params;

        connection.query('DELETE FROM psu WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.affectedRows === 0){
                return res.status(404).json({message: "Psu not found"});
            }

            return res.status(204);
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});




module.exports = routes;