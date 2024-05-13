import React from "react";

import { useState, useEffect} from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import ComponentsDetail from "./ComponentsDetail";

const url = 'http://localhost:3001/components/';

const ShowComponents = () => {
    const [cpus, setCpus] = useState([]);
    const [gpus, setGpus] = useState([]);
    const [rams, setRams] = useState([]);
    const [motherboards, setMotherboards] = useState([]);
    const [cases, setCases] = useState([]);
    const [powerSupplies, setPowerSupplies] = useState([]);
    const [storages, setStorages] = useState([]);
    const [cpuCooler, setCpuCooler] = useState([]);

    ///////////////////////////////////////////////
    const [loading, setLoading] = useState(true);

    // fetch all the components from the db and while loading
    useEffect(() => {
        
        fetchCpus();
        fetchMotherboards();
        fetchRams();
        fetchGpus();
        fetchStorages();
        fetchPowerSupplies();
        fetchCases();
        fetchCpuCooler();
    }, []);


    const fetchCpus = () => {

        fetch(url + 'cpus', {
            credentials: 'include',
           
        }).then(response => response.json()).then(data => {
            setCpus(data);

        });
    };

    const fetchCpuCooler = () => {

        fetch(url + 'cpu_coolers', {
            credentials: 'include',
           
        }).then(response => response.json()).then(data => {
            setCpuCooler(data);
            setLoading(false);
        });
    };

    const fetchMotherboards = () => {
            
        fetch(url + 'motherboard', {
            credentials: 'include',
            
        }).then(response => response.json()).then(data => {
            setMotherboards(data);
        });
    };

    const fetchRams = () => {
                
            fetch(url + 'ram', {
                credentials: 'include',
                
            }).then(response => response.json()).then(data => {
                setRams(data);
            });
    };
    
    const fetchGpus = () => {
                        
            fetch(url + 'gpus', {
                credentials: 'include',
                
            }).then(response => response.json()).then(data => {
                setGpus(data);
            });
    };
    
    const fetchStorages = () => {
                                
                fetch(url + 'storage', {

                    credentials: 'include',
                    
                }).then(response => response.json()).then(data => {
                    setStorages(data);
                });
    };
    
    const fetchPowerSupplies = () => {

        fetch(url + 'psu', {
            credentials: 'include',
           
        }).then(response => response.json()).then(data => {
            setPowerSupplies(data);
        });
    };

    const fetchCases = () => {

        fetch(url + 'case', {
            credentials: 'include',
            
        }).then(response => response.json()).then(data => {
            setCases(data);
        });
    };

    //mentre carica mostra un messaggio di loading
    if (loading) {
        return (
            <div>Loading...</div>
        );
    } else {
        //dopo aver caricato i componenti mostra la lista di tutti i componenti tramite bootstrap
        return (
           
            <Container>
                <Row>
                    <Col>
                        <h1>CPUs</h1>
                        {Array.isArray(cpus) && cpus.map((cpu) => (
                        <div key={cpu.id} style={{ marginBottom: '10px' }}> {/* Add key prop */}
                            <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{cpu.name}</Card.Title>
                                <Card.Text>
                                Cpu cores: {cpu.ncore} <br />
                                Cpu threads: {cpu.nthreads} <br />
                                </Card.Text>
                                {/*<ComponentsDetail components={cpu}/> */}
                            </Card.Body>
                            </Card>
                        </div>
                        ))}
                    </Col>
                    <Col>
                        <h1>GPUs</h1>
                        {Array.isArray(cpus) && gpus.map((gpu) => (
                            <div key={gpu.id} style={{ marginBottom: '10px' }}> {/* Add key prop */}
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{gpu.name}</Card.Title>
                                        <Card.Text>
                                            Architecture: {gpu.architecture} <br />
                                            Watt: {gpu.watt} <br />
                                        </Card.Text>
                                        {/*<ComponentsDetail components={gpu}/>*/}
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Col>
                    <Col>
                        <h1>RAMs</h1>
                        {Array.isArray(rams) && rams.map((ram) => (
                            <div key={ram.id} style={{ marginBottom: '10px' }}> {/* Add key prop */}
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{ram.name}</Card.Title>
                                        <Card.Text>
                                            Capacity: {ram.capacity} <br />
                                            Frequency: {ram.frequency} <br />
                                        </Card.Text>
                                        {/*<ComponentsDetail components={ram}/> */}
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Col>
                    <Col>
                        <h1>Motherboards</h1>
                        {Array.isArray(motherboards) && motherboards.map((motherboard) => (
                            <div key={motherboard.id} style={{ marginBottom: '10px' }}> {/* Add key prop */}
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{motherboard.name}</Card.Title>
                                        <Card.Text>
                                            Description: {motherboard.description} <br />
                                        </Card.Text>
                                        {/* <ComponentsDetail components={motherboard}/> */}
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Col>
                </Row>
                <Row>
                    
                    <Col>
                        <h1>Cases</h1>
                        {Array.isArray(cases) && cases.map((case1) => (
                            <div key={case1.id} style={{ marginBottom: '10px' }}> {/* Add key prop */}
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{case1.name}</Card.Title>
                                        <Card.Text>
                                            Height: {case1.height} <br />
                                            Length: {case1.length} <br />
                                            Width: {case1.width}
                                        </Card.Text>
                                        {/* <ComponentsDetail components={case1}/> */}
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Col>
                    <Col>
                        <h1>Power Supplies</h1>
                        {Array.isArray(powerSupplies) && powerSupplies.map((powerSupply) => (
                            <div key={powerSupply.id} style={{ marginBottom: '10px' }}> {/* Add key prop */}
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{powerSupply.name}</Card.Title>
                                        <Card.Text>
                                        </Card.Text>
                                        {/* <ComponentsDetail components={powerSupply}/> */}
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Col>
                
                    <Col>
                        <h1>Storages</h1>
                        {Array.isArray(storages) && storages.map((storage) => (
                            <div key={storage.id} style={{ marginBottom: '10px' }}> {/* Add key prop */}
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{storage.name}</Card.Title>
                                        <Card.Text>
                                            Capacity: {storage.storage}Gb
                                        </Card.Text>
                                        {/* <ComponentsDetail components={storage}/> */}
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Col>
                    <Col>
                        <h1>CPU Coolers</h1>
                        {Array.isArray(cpuCooler) && cpuCooler.map((cpuCoolerItem) => (
                            <div key={cpuCoolerItem.id} style={{ marginBottom: '10px' }}> {/* Add key prop */}
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{cpuCoolerItem.name}</Card.Title>
                                        <Card.Text>
                                            Watt: {cpuCoolerItem.watt}
                                        </Card.Text>
                                        {/*<ComponentsDetail components={cpuCoolerItem}/> */}
                                    </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
            
        );
    }
}
export default ShowComponents;