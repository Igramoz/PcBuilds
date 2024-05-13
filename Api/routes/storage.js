const  { Router } = require('express');
const connection = require('../db/connection');
const verifyToken = require('../checkToken/CheckToken.js');
const routes = Router();

/*
{
    "id": 0,
    "models": "string",
    "name": "string",
    "brand": "string",
    "storage": 0,
    "storage_length": 0,
    "tipo": "string"
  }
*/

routes.get('/components/storage',verifyToken('user'), async (req, res) => {
    try{

        connection.query('SELECT * FROM storage', (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No storage found"});
            }

            return res.status(200).json(results);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.post('/components/storage',verifyToken('admin'), async (req, res) => {

    try{
        const { models, name, brand, storage, storage_length, tipo } = req.body;

        // Check if the storage_length already exists in db
        connection.query('SELECT * FROM storage_lengths WHERE length = ?', [storage_length], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length > 0){
                connection.query('INSERT INTO storage(models, name, brand, storage, storage_length, tipo) VALUES(?, ?, ?, ?, ?, ?)', [models, name, brand, storage, storage_length, tipo], (error, results, fields) => {
                    if (error){
                        return res.status(500).json({message: "Internal server error", error: error});
                    }

                    return res.status(201).json({message: "Storage created"});
                });
            }else{
                return res.status(404).json({message: "Storage length not found"});
            }

            
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }

});

routes.get('/components/storage/:id',verifyToken('user'), async (req, res) => {
    try{
        const { id } = req.params;

        connection.query('SELECT * FROM storage WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Storage not found"});
            }

            return res.status(200).json(results[0]);
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.put('/components/storage/:id',verifyToken('admin'), async (req, res) => {
    try{
        const { id } = req.params;
        const { models, name, brand, storage, storage_length, tipo } = req.body;

        connection.query('UPDATE storage SET models = ?, name = ?, brand = ?, storage = ?, storage_length = ?, tipo = ? WHERE id = ?', [models, name, brand, storage, storage_length, tipo, id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            return res.status(200).json({message: "Storage updated"});
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.delete('/components/storage/:id',verifyToken('admin'), async (req, res) => {
    try{
        const { id } = req.params;

        connection.query('DELETE FROM storage WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            return res.status(200).json({message: "Storage deleted"});
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});


module.exports = routes;