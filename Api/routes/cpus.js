const  { Router } = require('express');
const connection = require('../db/connection');
const VerifyToken = require('../checkToken/CheckToken.js');
const routes = Router();

routes.get('/components/cpus',VerifyToken('user'), async (req, res) => {

    try{

        connection.query('SELECT * FROM cpus', (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No cpus found"});
            }

            return res.status(200).json(results);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.post('/components/cpus',VerifyToken('admin'), async (req, res) => {

    // id ncore nthreads models architecture chipset name
     try{

        const { ncore, nthreads, models, architecture, chipset, name } = req.body;

        if (ncore === undefined || nthreads === undefined || models === undefined || architecture === undefined || chipset === undefined || name === undefined){
            return res.status(400).json({message: "Missing required fields"});
        }

        if (isNaN(ncore) || isNaN(nthreads)){
            return res.status(400).json({message: "Invalid ncore or nthreads"});
        }

        //check if others are strings

        if (typeof models !== 'string' || typeof architecture !== 'string' || typeof chipset !== 'string' || typeof name !== 'string'){
            return res.status(400).json({message: "Invalid models, architecture, chipset or name"});
        }

        // Check if chipset exists in the database

        connection.query('SELECT * FROM chipsets WHERE chipset = ?', [chipset], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Chipset not found"});
            }

            // Insert cpu

            connection.query('INSERT INTO cpus (ncore, nthreads, models, architecture, chipset, name) VALUES (?, ?, ?, ?, ?, ?)', [ncore, nthreads, models, architecture, chipset, name], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                return res.status(201).json({message: "Cpu created", id: results.insertId});
            });

        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }

        
});

routes.get('/components/cpus/:id',VerifyToken('user'), async (req, res) => {

    try{

        const { id } = req.params;

        if (isNaN(id)){
            return res.status(400).json({message: "Invalid id"});
        }

        connection.query('SELECT * FROM cpus WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Cpu not found"});
            }

            return res.status(200).json(results[0]);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.put('/components/cpus/:id',VerifyToken('admin'), async (req, res) => {

    // id ncore nthreads models architecture chipset name

    try{

        

        if (isNaN(req.params.id)){
            return res.status(400).json({message: "Invalid id"});
        }

        const id  = parseInt(req.params.id);

        const { ncore, nthreads, models, architecture, chipset, name } = req.body;

        if (ncore === undefined || nthreads === undefined || models === undefined || architecture === undefined || chipset === undefined || name === undefined){
            return res.status(400).json({message: "Missing required fields"});
        }

        if (isNaN(ncore) || isNaN(nthreads)){
            return res.status(400).json({message: "Invalid ncore or nthreads"});
        }

        //check if others are strings

        if (typeof models !== 'string' || typeof architecture !== 'string' || typeof chipset !== 'string' || typeof name !== 'string'){
            return res.status(400).json({message: "Invalid models, architecture, chipset or name"});
        }

        // Check if chipset exists in the database

        connection.query('SELECT * FROM chipsets WHERE chipset = ?', [chipset], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Chipset not found"});
            }

            // Update cpu

            connection.query('UPDATE cpus SET ncore = ?, nthreads = ?, models = ?, architecture = ?, chipset = ?, name = ? WHERE id = ?', [ncore, nthreads, models, architecture, chipset, name, id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                return res.status(200).json(results[0]);
            });

        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }

    
        
});

routes.delete('/components/cpus/:id',VerifyToken('admin'), async (req, res) => {
    
    try{

        const { id } = req.params;

        if (isNaN(id)){
            return res.status(400).json({message: "Invalid id"});
        }

        connection.query('DELETE FROM cpus WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.affectedRows === 0){
                return res.status(404).json({message: "Cpu not found"});
            }

            return res.status(204);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.get('/components/cpus/chipset/:chipset',VerifyToken('admin'), async (req, res) => {

    const { chipset } = req.params;

    if (chipset === undefined){
        return res.status(400).json({message: "Missing required fields"});
    }

    if (typeof chipset !== 'string'){
        return res.status(400).json({message: "Invalid chipset"});
    }

    connection.query('SELECT * FROM `cpus` WHERE chipset = ?', [chipset], (error, results, fields) => {
        if (error){
            return res.status(500).json({message: "Internal server error", error: error});
        }

        if (results.length === 0){
            return res.status(404).json({message: "No cpus found" + chipset});
        }

        return res.status(200).json(results);

    });



});

module.exports = routes;