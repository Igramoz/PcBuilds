const  { Router } = require('express');
const connection = require('../db/connection');
const verifyToken = require('../checkToken/CheckToken.js');
const routes = Router();

/*
id": 0,
    "watt": 0,
    "brand": "string",
    "model": "string",
    "tipo": "string",
    "length": 0,
    "name": "string"
*/

routes.get('/components/cpu_coolers',verifyToken('user'), async (req, res) => {
        
    try{

        connection.query('SELECT * FROM cpu_coolers', (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No cpu coolers found"});
            }

            return res.status(200).json(results);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.post('/components/cpu_coolers',verifyToken('admin'), async (req, res) => {
    
    try{

        const { watt, brand, model, tipo, length, name } = req.body;

        if (watt === undefined || brand === undefined || model === undefined || tipo === undefined || length === undefined || name === undefined){
            return res.status(400).json({message: "Missing required fields"});
        }

        if (isNaN(watt) || isNaN(length)){
            return res.status(400).json({message: "Invalid watt or length"});
        }

        //check if others are strings

        if (typeof brand !== 'string' || typeof model !== 'string' || typeof tipo !== 'string' || typeof name !== 'string'){
            return res.status(400).json({message: "Invalid brand, model, tipo or name"});
        }

        connection.query('INSERT INTO cpu_coolers (watt, brand, model, tipo, length, name) VALUES (?, ?, ?, ?, ?, ?)', [watt, brand, model, tipo, length, name], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            return res.status(201).json(results[0]);
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.put('/components/cpu_coolers/:id',verifyToken('admin'), async (req, res) => {
    
    try{

        const { watt, brand, model, tipo, length, name } = req.body;
        const id = req.params.id;

        if (watt === undefined || brand === undefined || model === undefined || tipo === undefined || length === undefined || name === undefined){
            return res.status(400).json({message: "Missing required fields"});
        }

        if (isNaN(watt) || isNaN(length)){
            return res.status(400).json({message: "Invalid watt or length"});
        }

        //check if others are strings

        if (typeof brand !== 'string' || typeof model !== 'string' || typeof tipo !== 'string' || typeof name !== 'string'){
            return res.status(400).json({message: "Invalid brand, model, tipo or name"});
        }

        connection.query('UPDATE cpu_coolers SET watt = ?, brand = ?, model = ?, tipo = ?, length = ?, name = ? WHERE id = ?', [watt, brand, model, tipo, length, name, id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.affectedRows === 0){
                return res.status(404).json({message: "Cpu cooler not found"});
            }

            return res.status(200).json(results[0]);
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.get('/components/cpu_coolers/:id',verifyToken('user'), async (req, res) => {

    try{

        const { id } = req.params;

        if (isNaN(id)){
            return res.status(400).json({message: "Invalid id"});
        }

        connection.query('SELECT * FROM cpu_coolers WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Cpu cooler not found"});
            }

            return res.status(200).json(results[0]);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.put('/components/cpu_coolers/:id',verifyToken('admin'), async (req, res) => {

    try{

        const { watt, brand, model, tipo, length, name } = req.body;
        const id = req.params.id;

        if (watt === undefined || brand === undefined || model === undefined || tipo === undefined || length === undefined || name === undefined){
            return res.status(400).json({message: "Missing required fields"});
        }

        if (isNaN(watt) || isNaN(length)){
            return res.status(400).json({message: "Invalid watt or length"});
        }

        //check if others are strings

        if (typeof brand !== 'string' || typeof model !== 'string' || typeof tipo !== 'string' || typeof name !== 'string'){
            return res.status(400).json({message: "Invalid brand, model, tipo or name"});
        }

        connection.query('UPDATE cpu_coolers SET watt = ?, brand = ?, model = ?, tipo = ?, length = ?, name = ? WHERE id = ?', [watt, brand, model, tipo, length, name, id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.affectedRows === 0){
                return res.status(404).json({message: "Cpu cooler not found"});
            }

            return res.status(200).json(results[0]);
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.delete('/components/cpu_coolers/:id',verifyToken('admin'), async (req, res) => {

    try{

        const { id } = req.params;

        if (isNaN(id)){
            return res.status(400).json({message: "Invalid id"});
        }

        connection.query('DELETE FROM cpu_coolers WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.affectedRows === 0){
                return res.status(404).json({message: "Cpu cooler not found"});
            }

            return res.status(204);
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});



module.exports = routes;