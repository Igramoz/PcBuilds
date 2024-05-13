const  { Router } = require('express');
const connection = require('../db/connection');
const verifyToken = require('../checkToken/CheckToken.js');
const routes = Router();

routes.get('/components/storage_lengths',verifyToken('admin'), async (req, res) => {

   try{
        connection.query('SELECT * FROM storage_lengths', (error, results, fields) => {
            if (error){
            return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
            return res.status(404).json({message: "No storage lengths found"});
            }

            return res.status(200).json(results);
        
        });
   }catch(error){
       return res.status(500).json({message: "Internal server error", error: error});
   }

});

routes.post('/components/storage_lengths', async (req, res) => {

    try{

        if(!req.body){
            return res.status(400).json({message: "Invalid body"});
        }

        if (req.body.storage_length === undefined || req.body.storage_length === ""){
            return res.status(400).json({message: "Invalid storage length"});
        }

        if (req.body.storage_length.length > 4){
            return res.status(403).json({message: "Forbidden, storage length too long"});
        }

        if (isNaN(req.body.storage_length)){
            return res.status(400).json({message: "Invalid storage length not a number"});
        }

        const storage_length = parseInt(req.body.storage_length);

        connection.query('INSERT INTO storage_lengths (length) VALUES (?)', [storage_length], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }
            return res.status(201).json({
                length: storage_length,
            });
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
   
});

routes.get('/components/storage_lengths/:id',verifyToken('admin'), async (req, res) => {

    try{

        if (req.params.id === undefined || isNaN(req.params.id)){
            return res.status(400).json({message: "Invalid id"});
        }

        const id = parseInt(req.params.id);

        connection.query('SELECT * FROM storage_lengths WHERE length = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Storage length not found"});
            }

            return res.status(200).json(results);
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.delete('/components/storage_lengths/:id',verifyToken('admin'), async (req, res) => {

    try{
            
            if (req.params.id === undefined || isNaN(req.params.id)){
                return res.status(400).json({message: "Invalid id"});
            }
    
            const id = parseInt(req.params.id);
    
            connection.query('DELETE FROM storage_lengths WHERE length = ?', [id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }
    
                if (results.affectedRows === 0){
                    return res.status(404).json({message: "Storage length not found"});
                }
    
                return res.status(204).json();
            });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.put('/components/storage_lengths/:id',verifyToken('admin'), async (req, res) => {

    try{

        if (req.params.id === undefined || isNaN(req.params.id)){
            return res.status(400).json({message: "Invalid id"});
        }

        if(!req.body){
            return res.status(400).json({message: "Invalid body"});
        }

        if (req.body.storage_length === undefined || req.body.storage_length === "" || isNaN(req.body.storage_length)){
            return res.status(400).json({message: "Invalid storage length"});
        }

        if (req.body.storage_length.length > 4){
            return res.status(403).json({message: "Forbidden, storage length too long"});
        }

        const id = parseInt(req.params.id);
        const storage_length = parseInt(req.body.storage_length);

        connection.query('UPDATE storage_lengths SET length = ? WHERE length = ?', [storage_length, id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.affectedRows === 0){
                return res.status(404).json({message: "Storage length not found"});
            }

            return res.status(200).json({
                length: storage_length,
            });
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});


module.exports = routes;