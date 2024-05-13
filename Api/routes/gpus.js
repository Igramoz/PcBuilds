const  { Router } = require('express');
const connection = require('../db/connection');
const verifyToken = require('../checkToken/CheckToken.js');
const routes = Router();

/*
{
    "id": 0,
    "brand": "string",
    "models": "string",
    "watt": 0,
    "length": 0,
    "architecture": "string",
    "name": "string"
  }
*/

routes.get('/components/gpus',verifyToken('user'), async (req, res) => {
    
    try{

        connection.query('SELECT * FROM gpus', (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No gpus found"});
            }

            return res.status(200).json(results);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.post('/components/gpus',verifyToken('admin'), async (req, res) => {
    
    try{

        const { brand, models, watt, length, architecture, name } = req.body;

        if (brand === undefined || models === undefined || watt === undefined || length === undefined || architecture === undefined || name === undefined){
            return res.status(400).json({message: "Missing required fields"});
        }

        if (isNaN(watt) || isNaN(length)){
            return res.status(400).json({message: "Invalid watt or length"});
        }

        //check if others are strings

        if (typeof brand !== 'string' || typeof models !== 'string' || typeof architecture !== 'string' || typeof name !== 'string'){
            return res.status(400).json({message: "Invalid brand, models, architecture or name"});
        }

        connection.query('INSERT INTO gpus (brand, models, watt, length, architecture, name) VALUES (?, ?, ?, ?, ?, ?)', [brand, models, watt, length, architecture, name], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            return res.status(201).json({message: "Gpu created"});
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.get('/components/gpus/:id',verifyToken('user'), async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)){
        return res.status(400).json({message: "Invalid id"});
    }

    connection.query('SELECT * FROM gpus WHERE id = ?', [id], (error, results, fields) => {
        if (error){
            return res.status(500).json({message: "Internal server error", error: error});
        }

        if (results.length === 0){
            return res.status(404).json({message: "Gpu not found"});
        }

        return res.status(200).json(results[0]);
    });
});

routes.put('/components/gpus/:id',verifyToken('admin'), async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)){
        return res.status(400).json({message: "Invalid id"});
    }

    const { brand, models, watt, length, architecture, name } = req.body;

    if (brand === undefined || models === undefined || watt === undefined || length === undefined || architecture === undefined || name === undefined){
        return res.status(400).json({message: "Missing required fields"});
    }

    if (isNaN(watt) || isNaN(length)){
        return res.status(400).json({message: "Invalid watt or length"});
    }

    //check if others are strings

    if (typeof brand !== 'string' || typeof models !== 'string' || typeof architecture !== 'string' || typeof name !== 'string'){
        return res.status(400).json({message: "Invalid brand, models, architecture or name"});
    }

    connection.query('UPDATE gpus SET brand = ?, models = ?, watt = ?, length = ?, architecture = ?, name = ? WHERE id = ?', [brand, models, watt, length, architecture, name, id], (error, results, fields) => {
        if (error){
            return res.status(500).json({message: "Internal server error", error: error});
        }

        return res.status(200).json(results[0]);
    });
});

routes.delete('/components/gpus/:id',verifyToken('admin'), async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)){
        return res.status(400).json({message: "Invalid id"});
    }

    connection.query('DELETE FROM gpus WHERE id = ?', [id], (error, results, fields) => {
        if (error){
            return res.status(500).json({message: "Internal server error", error: error});
        }

        if (results.affectedRows === 0){
            return res.status(404).json({message: "Gpu not found"});
        }

        return res.status(204);
    });
});



module.exports = routes;