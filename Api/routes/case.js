const  { Router } = require('express');
const connection = require('../db/connection');
const VerifyToken = require('../checkToken/CheckToken.js');
const routes = Router();

/*
{
    "id": 0,
    "model": "string",
    "brand": "string",
    "length": 0,
    "height": 0,
    "width": 0,
    "name": "string",
    "max_gpu_length": 0
  }
*/

routes.get('/components/case',VerifyToken('user'), async (req, res) => {
    
    try{

        connection.query('SELECT * FROM cases', (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No cases found"});
            }

            return res.status(200).json(results);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.post('/components/case',VerifyToken('admin'), async (req, res) => {
        
        try{
    
            const { model, brand, length, height, width, name, max_gpu_length } = req.body;
    
            if (model === undefined || brand === undefined || length === undefined || height === undefined || width === undefined || name === undefined || max_gpu_length === undefined){
                return res.status(400).json({message: "Missing required fields"});
            }
    
            if (isNaN(length) || isNaN(height) || isNaN(width) || isNaN(max_gpu_length)){
                return res.status(400).json({message: "Invalid length, height, width or max_gpu_length"});
            }
    
            //check if others are strings
    
            if (typeof model !== 'string' || typeof brand !== 'string' || typeof name !== 'string'){
                return res.status(400).json({message: "Invalid model, brand or name"});
            }
    
            connection.query('INSERT INTO cases (model, brand, length, height, width, name, max_gpu_length) VALUES (?, ?, ?, ?, ?, ?, ?)', [model, brand, length, height, width, name, max_gpu_length], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }
    
                return res.status(201).json(results[0]);
            });
    
        }catch(error){
            return res.status(500).json({message: "Internal server error", error: error});
        }
        
});

routes.get('/components/case/:id',VerifyToken('user'), async (req, res) => {
        
    try{
        const { id } = req.params;

        if (isNaN(id)){
            return res.status(400).json({message: "Invalid id"});
        }

        connection.query('SELECT * FROM cases WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Case not found"});
            }

            return res.status(200).json(results[0]);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }

});

routes.put('/components/case/:id',VerifyToken('admin'), async (req, res) => {
    try{

        const { model, brand, length, height, width, name, max_gpu_length } = req.body;
        const { id } = req.params;

        if (isNaN(id)){
            return res.status(400).json({message: "Invalid id"});
        }

        if (model === undefined || brand === undefined || length === undefined || height === undefined || width === undefined || name === undefined || max_gpu_length === undefined){
            return res.status(400).json({message: "Missing required fields"});
        }

        if (isNaN(length) || isNaN(height) || isNaN(width) || isNaN(max_gpu_length)){
            return res.status(400).json({message: "Invalid length, height, width or max_gpu_length"});
        }

        //check if others are strings

        if (typeof model !== 'string' || typeof brand !== 'string' || typeof name !== 'string'){
            return res.status(400).json({message: "Invalid model, brand or name"});
        }

        connection.query('UPDATE cases SET model = ?, brand = ?, length = ?, height = ?, width = ?, name = ?, max_gpu_length = ? WHERE id = ?', [model, brand, length, height, width, name, max_gpu_length, id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            return res.status(200).json(results[0]);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.delete('/components/case/:id',VerifyToken('admin'), async (req, res) => {
    try{
        const { id } = req.params;

        if (isNaN(id)){
            return res.status(400).json({message: "Invalid id"});
        }

        connection.query('DELETE FROM cases WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            return res.status(204);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});



module.exports = routes;