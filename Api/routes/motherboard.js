const  { Router } = require('express');
const connection = require('../db/connection');
const verifyToken = require('../checkToken/CheckToken.js');
const routes = Router();

/**
 * "id": 0,
    "brand": "string",
    "name": "string",
    "models": "string",
    "chipset": "string",
    "types_ram": "string",
    "description": "string",
    "ssd_length": "string"

    check chipset types_ram and ssd_length
 */

routes.get('/components/motherboard',verifyToken('user'), async (req, res) => {
    try{

        connection.query('SELECT * FROM motherboard', (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No motherboard found"});
            }

            return res.status(200).json(results);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.post('/components/motherboard',verifyToken('admin'), async (req, res) => {
    try{
        const { brand, name, models, chipset, types_ram, description, ssd_length } = req.body;

        // Check if the chipset already exists in db
        connection.query('SELECT * FROM chipsets WHERE chipset = ?', [chipset], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length > 0){
                connection.query('SELECT * FROM types_ram WHERE type_ram = ?', [types_ram], (error, results, fields) => {
                    if (error){
                        return res.status(500).json({message: "Internal server error", error: error});
                    }

                    if (results.length > 0){
                        connection.query('SELECT * FROM storage_lengths WHERE length = ?', [ssd_length], (error, results, fields) => {
                            if (error){
                                return res.status(500).json({message: "Internal server error", error: error});
                            }

                            if (results.length > 0){
                                connection.query('INSERT INTO motherboard(brand, name, models, chipsets, types_ram, description, ssd_length) VALUES(?, ?, ?, ?, ?, ?, ?)', [brand, name, models, chipset, types_ram, description, ssd_length], (error, results, fields) => {
                                    if (error){
                                        return res.status(500).json({message: "Internal server error", error: error});
                                    }

                                    return res.status(201).json({message: "Motherboard created"});
                                });
                            }else{
                                return res.status(404).json({message: "SSD length not found"});
                            }
                        });
                    }else{
                        return res.status(404).json({message: "Types ram not found"});
                    }
                });
            }else{
                return res.status(404).json({message: "Chipset not found"});
            }
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.get('/components/motherboard/:id',verifyToken('user'), async (req, res) => {
    try{
        const { id } = req.params;

        connection.query('SELECT * FROM motherboard WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Motherboard not found"});
            }

            return res.status(200).json(results[0]);
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.put('/components/motherboard/:id',verifyToken('admin'), async (req, res) => {
    try{
        const { brand, name, models, chipset, types_ram, description, ssd_length } = req.body;
        const { id } = req.params;

        connection.query('SELECT * FROM motherboard WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Motherboard not found"});
            }

            connection.query('UPDATE motherboard SET brand = ?, name = ?, models = ?, chipsets = ?, types_ram = ?, description = ?, ssd_length = ? WHERE id = ?', [brand, name, models, chipset, types_ram, description, ssd_length, id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                return res.status(200).json({message: "Motherboard updated"});
            });
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.delete('/components/motherboard/:id',verifyToken('admin'), async (req, res) => {
    try{
        const { id } = req.params;

        connection.query('SELECT * FROM motherboard WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Motherboard not found"});
            }

            connection.query('DELETE FROM motherboard WHERE id = ?', [id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                return res.status(200).json({message: "Motherboard deleted"});
            });
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});


module.exports = routes;