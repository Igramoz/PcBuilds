const  { Router } = require('express');
const connection = require('../db/connection');
const verifyToken = require('../checkToken/CheckToken.js');
const routes = Router();

/*
{
    "id": 0,
    "case_id": 0,
    "cpu_id": 0,
    "motherboard_id": 0,
    "ram_id": 0,
    "psu_id": 0,
    "storage_id": 0,
    "gpu_id": 0,
    "cpu_cooler_id": 0
  }
*/

routes.get('/builds',verifyToken('user'), async (req, res) => {
    try{

        connection.query('SELECT * FROM builds', (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "No builds found"});
            }

            return res.status(200).json(results);

        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.post('/builds',verifyToken('user') , async (req, res) => {
    try{
        const case_id = parseInt(req.body.case_id);
        const cpu_id = parseInt(req.body.cpu_id);
        const motherboard_id = parseInt(req.body.motherboard_id);
        const ram_id = parseInt(req.body.ram_id);
        const psu_id = parseInt(req.body.psu_id);
        const storage_id = parseInt(req.body.storage_id);
        const gpu_id = parseInt(req.body.gpu_id);
        const cpu_cooler_id = parseInt(req.body.cpu_cooler_id);

        connection.query('SELECT * FROM cases WHERE id = ?', [case_id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Case not found"});
            }


            connection.query('SELECT * FROM cpus WHERE id = ?', [cpu_id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                if (results.length === 0){
                    return res.status(404).json({message: "Cpu not found"});
                }


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


                        connection.query('SELECT * FROM psu WHERE id = ?', [psu_id], (error, results, fields) => {
                            if (error){
                                return res.status(500).json({message: "Internal server error", error: error});
                            }

                            if (results.length === 0){
                                return res.status(404).json({message: "Psu not found"});
                            }


                            connection.query('SELECT * FROM storage WHERE id = ?', [storage_id], (error, results, fields) => {
                                if (error){
                                    return res.status(500).json({message: "Internal server error", error: error});
                                }

                                if (results.length === 0){
                                    return res.status(404).json({message: "Storage not found"});
                                }


                                connection.query('SELECT * FROM gpus WHERE id = ?', [gpu_id], (error, results, fields) => {
                                    if (error){
                                        return res.status(500).json({message: "Internal server error", error: error});
                                    }

                                    if (results.length === 0){
                                        return res.status(404).json({message: "Gpu not found"});
                                    }


                                    connection.query('SELECT * FROM cpu_coolers WHERE id = ?', [cpu_cooler_id], (error, results, fields) => {
                                        if (error){
                                            return res.status(500).json({message: "Internal server error", error: error});
                                        }

                                        if (results.length === 0){
                                            return res.status(404).json({message: "Cpu cooler not found"});
                                        }

                                        

                                        connection.query('INSERT INTO builds (id, casepc, cpu, motherboard, ram, psu, storage, gpu, cpu_cooler) VALUES (null ,?, ?, ?, ?, ?, ?, ?, ?)', [case_id, cpu_id, motherboard_id, ram_id, psu_id, storage_id, gpu_id, cpu_cooler_id], (error, results, fields) => {
                                            if (error){
                                                console.log(error);
                                                return res.status(500).json({message: "Internal server error", error: error});
                                            }

                                            return res.status(201).json({message: "Build created", id: results.insertId});
                                        });

                                        
                                    });
                                });

                            });
                        });
                    });
                });
            });
        });
        
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.get('/builds/:id',verifyToken('user'), async (req, res) => {
    try{
        const { id } = req.params;

        connection.query('SELECT * FROM builds WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Build not found"});
            }

            return res.status(200).json(results[0]);
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.put('/builds/:id',verifyToken('user'), async (req, res) => {
    try{
        const { case_id, cpu_id, motherboard_id, ram_id, psu_id, storage_id, gpu_id, cpu_cooler_id } = req.body;
        const { id } = req.params;

        connection.query('SELECT * FROM builds WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Build not found"});
            }

            connection.query('SELECT * FROM cases WHERE id = ?', [case_id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                if (results.length === 0){
                    return res.status(404).json({message: "Case not found"});
                }

                connection.query('SELECT * FROM cpus WHERE id = ?', [cpu_id], (error, results, fields) => {
                    if (error){
                        return res.status(500).json({message: "Internal server error", error: error});
                    }

                    if (results.length === 0){
                        return res.status(404).json({message: "Cpu not found"});
                    }

                    connection.query('SELECT * FROM motherboards WHERE id = ?', [motherboard_id], (error, results, fields) => {
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

                            connection.query('SELECT * FROM psu WHERE id = ?', [psu_id], (error, results, fields) => {
                                if (error){
                                    return res.status(500).json({message: "Internal server error", error: error});
                                }

                                if (results.length === 0){
                                    return res.status(404).json({message: "Psu not found"});
                                }

                                connection.query('SELECT * FROM storage WHERE id = ?', [storage_id], (error, results, fields) => {
                                    if (error){
                                        return res.status(500).json({message: "Internal server error", error: error});
                                    }

                                    if (results.length === 0){
                                        return res.status(404).json({message: "Storage not found"});
                                    }

                                    connection.query('SELECT * FROM gpus WHERE id = ?', [gpu_id], (error, results, fields) => {
                                        if (error){
                                            return res.status(500).json({message: "Internal server error", error: error});
                                        }

                                        if (results.length === 0){
                                            return res.status(404).json({message: "Gpu not found"});
                                        }

                                        connection.query('SELECT * FROM cpu_coolers WHERE id = ?', [cpu_cooler_id], (error, results, fields) => {
                                            if (error){
                                                return res.status(500).json({message: "Internal server error", error: error});
                                            }

                                            if (results.length === 0){
                                                return res.status(404).json({message: "Cpu cooler not found"});
                                            }

                                            connection.query('UPDATE builds SET case = ?, cpu = ?, motherboard = ?, ram = ?, psu = ?, storage = ?, gpu = ?, cpu_cooler = ? WHERE id = ?', [case_id, cpu_id, motherboard_id, ram_id, psu_id, storage_id, gpu_id, cpu_cooler_id, id], (error, results, fields) => {
                                                if (error){
                                                    return res.status(500).json({message: "Internal server error", error: error});
                                                }

                                                return res.status(200).json({message: "Build updated"});
                                            });
                                        });
                                    });

                                });
                            });
                        });
                    });
                });
            });
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});

routes.delete('/builds/:id',verifyToken('user'), async (req, res) => {
    try{
        const { id } = req.params;

        connection.query('SELECT * FROM builds WHERE id = ?', [id], (error, results, fields) => {
            if (error){
                return res.status(500).json({message: "Internal server error", error: error});
            }

            if (results.length === 0){
                return res.status(404).json({message: "Build not found"});
            }

            connection.query('DELETE FROM builds WHERE id = ?', [id], (error, results, fields) => {
                if (error){
                    return res.status(500).json({message: "Internal server error", error: error});
                }

                return res.status(200).json({message: "Build deleted"});
            });
        });
    }catch(error){
        return res.status(500).json({message: "Internal server error", error: error});
    }
});


module.exports = routes;