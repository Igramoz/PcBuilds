const  { Router } = require('express');
const connection = require('../db/connection');
const verifyToken = require('../checkToken/CheckToken.js');
const routes = Router();



routes.get('/components/types_ram',verifyToken('admin'), async (req, res) => {
    try {

        connection.query('SELECT * FROM types_ram', (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No types_ram found"});
            }

            return res.status(200).json(results);
        
        });
        
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.post('/components/types_ram',verifyToken('admin'), async (req, res) => {
    try {

        if(!req.body){
            return res.status(400).json({message: "Invalid body"});
        }

        if (req.body.type_ram === undefined || req.body.type_ram === "" || typeof req.body.type_ram !== "string"){
            return res.status(400).json({message: "Invalid type_ram"});
        }

        if (req.body.type_ram.length > 4){
            return res.status(403).json({message: "Forbidden, type_ram too long"});
        }

        const type_ram = req.body.type_ram;

        connection.query('INSERT INTO types_ram (type_ram) VALUES (?)', [type_ram], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }
            return res.status(201).json({
                type_ram: type_ram,
            });
        });
    }catch (error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.get('/components/types_ram/:id',verifyToken('admin'), async (req, res) => {

    try{
        
        if (!isNaN(req.params.id) || req.params.id === undefined){
            return res.status(400).json({message: "Invalid type_ram"});
        }

        const id = req.params.id;

        connection.query('SELECT * FROM types_ram WHERE type_ram = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }
            if (results.length === 0){
                return res.status(404).json({message: "No type_ram found"});
            }
            return res.status(200).json(results);
        });

    }catch (error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.put('/components/types_ram/:id',verifyToken('admin'), async (req, res) => {

    try{

        if(!req.body){
            return res.status(400).json({message: "Invalid body"});
        }

        if (req.body.type_ram === undefined || req.body.type_ram === "" || typeof req.body.type_ram !== "string"){
            return res.status(400).json({message: "Invalid type_ram"});
        }

        if (req.body.type_ram.length > 4){
            return res.status(403).json({message: "Forbidden, type_ram too long"});
        }

        const type_ram = req.body.type_ram;

        connection.query('UPDATE types_ram SET type_ram = ? WHERE type_ram = ?', [type_ram, req.params.id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }
            return res.status(200).json({
                type_ram: type_ram,
            });
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.delete('/components/types_ram/:id',verifyToken('admin'), async (req, res) => {

    try{

        if (!isNaN(req.params.id) || req.params.id === undefined){
            return res.status(400).json({message: "Invalid type_ram"});
        }

        connection.query('DELETE FROM types_ram WHERE type_ram = ?', [req.params.id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }
            if (results.affectedRows === 0){
                return res.status(404).json({message: "No type_ram found"});
            }

            return res.status(204);
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

module.exports = routes;
