const  { Router } = require('express');
const connection = require('../db/connection');
const verifyToken = require('../checkToken/CheckToken.js');
const routes = Router();

routes.get('/components/chipsets',verifyToken('user'), async (req, res) => {
    connection.query('SELECT * FROM chipsets', (error, results, fields) => {
        if (error){
            return res.status(500).json({message: "Internal server error", error: error});
        }

        if (results.length === 0){
            return res.status(404).json({message: "No chipsets found"});
        }

        return res.status(200).json(results);
    
    });
    
});

routes.post('/components/chipsets',verifyToken('admin'), async (req, res) => {

    try {

        if(!req.body){
            return res.status(400).json({message: "Invalid body"});
        }

        if (req.body.chipset === undefined || req.body.chipset === "" || typeof req.body.chipset !== "string"){
            return res.status(400).json({message: "Invalid chipset"});
        }

        if (req.body.chipset.length > 10){
            return res.status(403).json({message: "Forbidden, chipset too long"});
        }

        const chipset = req.body.chipset;

        connection.query('INSERT INTO chipsets (chipset) VALUES (?)', [chipset], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }
            return res.status(201).json({
                chipset: chipset,
            });
        });
    }catch (error){
        return res.status(500).json({message: "Internal server error", error: error});
    }


   
});

routes.get('/components/chipsets/:id',verifyToken('user'), async (req, res) => {

    try{

        if (req.params.id === undefined || !isNaN(req.params.id)){
            return res.status(400).json({message: "Invalid id"});
        }

        const id = req.params.id;

        connection.query('SELECT * FROM chipsets WHERE chipset = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No chipset found"});
            }

            return res.status(200).json(results);
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
    
});

routes.put('/components/chipsets/:id',verifyToken('admin'), async (req, res) => {

    try{
        
        if (req.params.id === undefined || !isNaN(req.params.id)){
            return res.status(400).json({message: "Invalid id"});
        }

        if(!req.body){
            return res.status(400).json({message: "Invalid body"});
        }

        if (req.body.chipset === undefined || req.body.chipset === "" || typeof req.body.chipset !== "string"){
            return res.status(400).json({message: "Invalid chipset"});
        }

        if (req.body.chipset.length > 10){
            return res.status(403).json({message: "Forbidden, chipset too long"});
        }

        const id = req.params.id;
        const chipset = req.body.chipset;

        connection.query('UPDATE chipsets SET chipset = ? WHERE chipset = ?', [chipset, id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.affectedRows === 0){
                return res.status(404).json({message: "No chipset found"});
            }

            return res.status(201);
        });

    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }

    
});

routes.delete('/components/chipsets/:id',verifyToken('admin'), async (req, res) => {

    try{
        if (req.params.id === undefined || !isNaN(req.params.id)){
            return res.status(400).json({message: "Invalid id"});
        }

        const id = req.params.id;

        connection.query('DELETE FROM chipsets WHERE chipset = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.affectedRows === 0){
                return res.status(404).json({message: "No chipset found"});
            }

            return res.status(204);
       
        });

    }catch (error){
        return res.status(500).json({message: "Internal server error", error: error});
    }

});

module.exports = routes;



