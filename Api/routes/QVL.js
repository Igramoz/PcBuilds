const  { Router } = require('express');
const connection = require('../db/connection');
const verifyToken = require('../checkToken/CheckToken.js');
const routes = Router();

/*
"id": 0,
    "motherboard_id": 0,
    "ram_id": 0
*/

routes.get('/components/QVL',verifyToken('user'), async (req, res) => {
    try{

        connection.query('SELECT * FROM QVL', (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No QVL found"});
            }

            return res.status(200).json(results);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.post('/components/QVL',verifyToken('admin'), async (req, res) => {
    try{
        const { motherboard_id, ram_id } = req.body;

        connection.query('SELECT * FROM motherboard WHERE id = ?', [motherboard_id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Motherboard not found"});
            }

            connection.query('SELECT * FROM ram WHERE id = ?', [ram_id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                if (results.length === 0){
                    return res.status(404).json({message: "Ram not found"});
                }

                connection.query('INSERT INTO QVL(motherboard, ram) VALUES(?, ?)', [motherboard_id, ram_id], (error, results, fields) => {
                    if (error){
                        return res.status(500).json({message: "Internal server error", error: error});
                    }

                    return res.status(201).json({message: "QVL created"});
                });
            });
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.get('/components/QVL/:id',verifyToken('user'), async (req, res) => {

    try{
        const { id } = req.params;

        connection.query('SELECT * FROM QVL WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "QVL not found"});
            }

            return res.status(200).json(results[0]);
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.put('/components/QVL/:id',verifyToken('admin'), async (req, res) => {

    try{
        const { id } = req.params;
        const { motherboard_id, ram_id } = req.body;

        connection.query('SELECT * FROM motherboard WHERE id = ?', [motherboard_id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Motherboard not found"});
            }

            connection.query('SELECT * FROM ram WHERE id = ?', [ram_id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                if (results.length === 0){
                    return res.status(404).json({message: "Ram not found"});
                }

                connection.query('UPDATE QVL SET motherboard = ?, ram = ? WHERE id = ?', [motherboard_id, ram_id, id], (error, results, fields) => {
                    if (error){
                        return res.status(500).json({message: "Internal server error", error: error});
                    }

                    return res.status(200).json(results[0]);
                });
            });
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }

});

routes.delete('/components/QVL/:id',verifyToken('admin'), async (req, res) => {
    try{
        const { id } = req.params;

        connection.query('DELETE FROM QVL WHERE id = ?', [id], (error, results, fields) => {
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