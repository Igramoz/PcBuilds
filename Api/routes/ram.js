const  { Router } = require('express');
const connection = require('../db/connection');
const verifyToken = require('../checkToken/CheckToken.js');
const routes = Router();

/*
{
    "id": 0,
    "brand": "string",
    "models": "string",
    "storage": 0,
    "latency": 0,
    "frequency": 0,
    "numbers": 0,
    "types_ram": "string",
    "name": "string"
  }
*/

routes.get('/components/ram',verifyToken('user'), async (req, res) => {
    try{

        connection.query('SELECT * FROM ram', (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No ram found"});
            }

            return res.status(200).json(results);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.post('/components/ram',verifyToken('admin'), async (req, res) => {
    try{
        const { brand, models, storage, latency, frequency, numbers, types_ram, name } = req.body;

        // Check if the types_ram already exists in db
        connection.query('SELECT * FROM types_ram WHERE type_ram = ?', [types_ram], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length > 0){
                connection.query('INSERT INTO ram(brand, models, storage, latency, frequency, numbers, types_ram, name) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [brand, models, storage, latency, frequency, numbers, types_ram, name], (error, results, fields) => {
                    if (error){
                        return res.status(500).json({message: "Internal server error", error: error});
                    }

                    return res.status(201).json({message: "Ram created"});
                });
            }else{
                return res.status(404).json({message: "Types ram not found"});
            }
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.get('/components/ram/:id',verifyToken('user'), async (req, res) => {
    try{
        const { id } = req.params;

        connection.query('SELECT * FROM ram WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Ram not found"});
            }

            return res.status(200).json(results[0]);
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.put('/components/ram/:id',verifyToken('admin'), async (req, res) => {
    try{
        const { id } = req.params;
        const { brand, models, storage, latency, frequency, numbers, types_ram, name } = req.body;


        connection.query('UPDATE ram SET brand = ?, models = ?, storage = ?, latency = ?, frequency = ?, numbers = ?, types_ram = ?, name = ? WHERE id = ?', [brand, models, storage, latency, frequency, numbers, types_ram, name, id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            return res.status(200).json({message: "Ram updated"});
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.delete('/components/ram/:id',verifyToken('admin'), async (req, res) => {
    try{
        const { id } = req.params;

        connection.query('DELETE FROM ram WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            return res.status(200).json({message: "Ram deleted"});
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});


module.exports = routes;