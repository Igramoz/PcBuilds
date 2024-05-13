import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const CreateBuildBody = {
    textAlign: 'center',
    padding: '10px',
    margin: '10px',
    border: '1px solid black',
    borderRadius: '10px',
    backgroundColor: 'lightgrey'
};

const tableStyle = {
   borderCollapse: 'collapse',
   //centra la tabella
    margin: 'auto',
    

  
};

const thTdStyle = {
  //border: '1px solid black',
  //padding: '8px',
  //textAlign: 'left'
};

const thStyle = {
  ...thTdStyle,
  //backgroundColor: '#f2f2f2'
};

const evenRowStyle = {
  backgroundColor: '#f2f2f2'
};

const url = 'http://localhost:3001/components/';

function CreateBuild () {
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [products, setProducts] = useState([]);

    //const di ogni componente dalla fetch

    const [cpus, setCpus] = useState([]);
    const [motherboards, setMotherboards] = useState([]);
    const [rams, setRams] = useState([]);
    const [gpus, setGpus] = useState([]);
    const [storages, setStorages] = useState([]);
    const [powerSupplies, setPowerSupplies] = useState([]);
    const [cases, setCases] = useState([]);
    const [cpuCooler, setCpuCooler] = useState([]);

    //effettua le fetch di ogni componente
    useEffect(() => {
        const fetchAll = async () => {
            await fetchCpus();
            await fetchMotherboards();
            await fetchRams();
            await fetchGpus();
            await fetchStorages();
            await fetchPowerSupplies();
            await fetchCases();
            await fetchCpuCooler();
        }
        
        fetchAll();
    }, []);

    const token = localStorage.getItem('token');

    //components selezionati dall'utente

    const [selectedCpu, setSelectedCpu] = useState(null);
    const [selectedMotherboard, setSelectedMotherboard] = useState(null);
    const [selectedRam, setSelectedRam] = useState(null);
    const [selectedGpu, setSelectedGpu] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [selectedPowerSupply, setSelectedPowerSupply] = useState(null);
    const [selectedCase, setSelectedCase] = useState(null);
    const [selectedCpuCooler, setSelectedCpuCooler] = useState(null);

    const [chipset, setChipset] = useState(null);
    const [typesRam, setTypesRam] = useState(null);

    const saveBuild = () => {
        //salva il build nel database

        //controllo se tutti i componenti sono stati selezionati

        if (!selectedCpu || !selectedMotherboard || !selectedRam || !selectedGpu || !selectedStorage || !selectedPowerSupply || !selectedCase || !selectedCpuCooler) {
            alert('Please select all components');
            return;
        }
        
    
        fetch('http://localhost:3001/builds', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                case_id: selectedCase.id,
                cpu_id: selectedCpu.id,
                cpu_cooler_id: selectedCpuCooler.id,
                psu_id: selectedPowerSupply.id,
                gpu_id: selectedGpu.id,
                ram_id: selectedRam.id,
                storage_id: selectedStorage.id,
                motherboard_id: selectedMotherboard.id

            })
        }).then(response => response.json()).then(data => {
            fetch('http://localhost:3001/user_builds', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    build_id: data.id,
                    username_id: localStorage.getItem('email')
    
                }),
            }).then(response =>
                response.json()).then(data => {
                alert('Build saved');
            }).catch(error => {
                console.error('Error:', error);
                alert('An error occurred, please try again');
            }
            );
        });
        
    };

   

    
    async function fetchCpus(){

        fetch(url + 'cpus', {
            credentials: 'include',
           
        }).then(response => response.json()).then(data => {
            setCpus(data);
        });
    };

    async function fetchCpuCooler(){

        fetch(url + 'cpu_coolers', {
            credentials: 'include',
           
        }).then(response => response.json()).then(data => {
            setCpuCooler(data);
        });
    };

    async function fetchMotherboards (){
            
        fetch(url + 'motherboard', {
            credentials: 'include',
            
        }).then(response => response.json()).then(data => {
            setMotherboards(data);
        });
    };

    async function fetchRams () {
                
            fetch(url + 'ram', {
                credentials: 'include',
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }).then(response => response.json()).then(data => {
                setRams(data);
            });
    };
    
    async function fetchGpus (){
                        
            fetch(url + 'gpus', {
                credentials: 'include',
                
            }).then(response => response.json()).then(data => {
                setGpus(data);
            });
    };
    
    async function fetchStorages(){
                                
                fetch(url + 'storage', {
                    credentials: 'include',
                    
                }).then(response => response.json()).then(data => {
                    setStorages(data);
                });
    };
    
    async function fetchPowerSupplies (){

        fetch(url + 'psu', {
            credentials: 'include',
           
        }).then(response => response.json()).then(data => {
            setPowerSupplies(data);
        });
    };

    async function fetchCases (){

        fetch(url + 'case', {
            credentials: 'include',
           
        }).then(response => response.json()).then(data => {
            setCases(data);
        });
    };

    const fetchProducts = (component) => {
        // in base al componente selezionato impostare i prodotti

        switch (component) {
            case 'Motherboard':
                //setProducts

                setProducts(motherboards);
                break;

            case 'CPU':
                //setProducts
                setProducts(cpus);


                break;
            case 'Ram':
                //setProducts
                setProducts(rams);
                

                break;
            case 'Gpu':
                //setProducts
                setProducts(gpus);

                break;
            case 'Storage':
                //setProducts
                setProducts(storages);

                break;
            case 'Power Supply':
                //setProducts
                setProducts(powerSupplies);

                break;
            case 'Case':
                //setProducts
                setProducts(cases);

                break;
            case 'Cpu Cooler':
                //setProducts
                setProducts(cpuCooler);
                break;
            default:
                setProducts([]);
            break;
        }
    };
    
    useEffect(() => {
        // Effettua la fetch dei prodotti quando il componente selezionato cambia
        if (selectedComponent) {
            fetchProducts(selectedComponent);
        }
    }, [fetchProducts, selectedComponent]);
    
    
    
    const handleComponentSelect = (component) => {
        setSelectedComponent(component);
    };

    //onSelect per aggiungere il prodotto alla tabella del build
    const onSelect = (product) => {
        

        switch (selectedComponent) {
            case 'Motherboard':
                //aggiungere il prodotto alla tabella del build
                setSelectedMotherboard(product);
                setChipset(product.chipsets);
                setTypesRam(product.types_ram);
                break;
            case 'CPU':
                //aggiungere il prodotto alla tabella del build
                setSelectedCpu(product);
                setChipset(product.chipset);
                break;
            case 'Ram':
                //aggiungere il prodotto alla tabella del build
                setSelectedRam(product);
                setTypesRam(product.types_ram);
                break;
            case 'Gpu':
                //aggiungere il prodotto alla tabella del build
                setSelectedGpu(product);
                break;
            case 'Storage':
                //aggiungere il prodotto alla tabella del build
                setSelectedStorage(product);
                break;
            case 'Power Supply':
                //aggiungere il prodotto alla tabella del build
                setSelectedPowerSupply(product);
                break;
            case 'Case':
                //aggiungere il prodotto alla tabella del build
                setSelectedCase(product);
                break;
            case 'Cpu Cooler':
                //aggiungere il prodotto alla tabella del build
                setSelectedCpuCooler(product);
                break;
            default:
                break;
        }

    };
    
    return (
        <div style={CreateBuildBody}>
            <h1>Create a Build</h1>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div style={{width: '40%'}}>
                    
                    <table className="build-table" style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Component</th>
                                <th style={thStyle}>Select</th>
                                <th style={thStyle}>Component Selected</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr style={evenRowStyle}>
                                <td style={thTdStyle}>Motherboard</td>
                                <td style={thTdStyle}>
                                    <div className="d-grid gap-2">
                                        <Button variant="outline-dark" onClick={() => handleComponentSelect('Motherboard')}>Select Motherboard</Button>
                                    </div>
                                </td>
                                <td style={thTdStyle}>{selectedMotherboard ? selectedMotherboard.name : 'Not Selected'}</td>
                                

                            </tr>
                            <tr style={evenRowStyle}>
                                <td style={thTdStyle}>CPU</td>
                                <td style={thTdStyle}>
                                    <div className="d-grid gap-2">
                                        <Button variant="outline-dark" onClick={() => handleComponentSelect('CPU')}>Select Cpu</Button>
                                    </div>
                                </td>
                                <td style={thTdStyle}>{selectedCpu ? selectedCpu.name : 'Not Selected'}</td>
                            </tr>
                            <tr style={evenRowStyle}>
                                <td style={thTdStyle}>Ram</td>
                                <td style={thTdStyle}>
                                    <div className="d-grid gap-2">  
                                        <Button variant="outline-dark" onClick={() => handleComponentSelect('Ram')}>Select Ram</Button>
                                    </div>
                                </td>
                                <td style={thTdStyle}>{selectedRam ? selectedRam.name : 'Not Selected'}</td>
                            </tr>
                            <tr style={evenRowStyle}>
                                <td style={thTdStyle}>Gpu</td>
                                    <td style={thTdStyle}>
                                        <div className="d-grid gap-2">
                                            <Button variant="outline-dark" onClick={() => handleComponentSelect('Gpu')}>Select Gpu</Button>
                                        </div>
                                    </td>
                                    <td style={thTdStyle}>{selectedGpu ? selectedGpu.name : 'Not Selected'}</td>
                                </tr>
                                <tr style={evenRowStyle}>
                                    <td style={thTdStyle}>Storage</td>
                                    <td style={thTdStyle}>
                                        <div className="d-grid gap-2">
                                            <Button variant="outline-dark" onClick={() => handleComponentSelect('Storage')}>Select Storage</Button>
                                        </div>
                                    </td>
                                    <td style={thTdStyle}>{selectedStorage ? selectedStorage.name : 'Not Selected'}</td>
                                </tr>
                                <tr style={evenRowStyle}>
                                    <td style={thTdStyle}>Power Supply</td>
                                    <td style={thTdStyle}>
                                        <div className="d-grid gap-2">
                                            <Button variant="outline-dark" onClick={() => handleComponentSelect('Power Supply')}>Select Power Supply</Button>
                                        </div>
                                    </td>
                                    <td style={thTdStyle}>{selectedPowerSupply ? selectedPowerSupply.name : 'Not Selected'}</td>
                                </tr>
                                <tr style={evenRowStyle}>
                                    <td style={thTdStyle}>Case</td>
                                    <td style={thTdStyle}>
                                        <div className="d-grid gap-2">
                                            <Button variant="outline-dark" onClick={() => handleComponentSelect('Case')}>Select Case</Button>
                                        </div>
                                    </td>
                                    <td style={thTdStyle}>{selectedCase ? selectedCase.name : 'Not Selected'}</td>
                                </tr>
                                <tr style={evenRowStyle}>
                                    <td style={thTdStyle}>Cpu Cooler</td>
                                    <td style={thTdStyle}>
                                        <div className="d-grid gap-2">
                                            <Button variant="outline-dark" onClick={() => handleComponentSelect('Cpu Cooler')}>Select Cpu Cooler</Button>
                                        </div>
                                    </td>
                                <td style={thTdStyle}>{selectedCpuCooler ? selectedCpuCooler.name : 'Not Selected'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{width: '60%'}}>
                    <h2>Selected Component: {selectedComponent}</h2>
                    <Row>
                    {Array.isArray(products) && products.map((product, index) => (
                        <Col md={4} key={index}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    {selectedComponent === 'Ram' && (
                                        <Card.Text>
                                            Capacity: {product.capacity}Gb <br /> Frequency: {product.frequency}
                                            {typesRam && typesRam !== null && product.types_ram !== typesRam && selectedRam === null && (
                                                <span style={{ color: 'red' }}> (Incompatible)</span>
                                            )}
                                        </Card.Text>
                                    )}
                                    {selectedComponent === 'Motherboard' && (
                                        <Card.Text>
                                            Description: {product.description}
                                            {chipset && chipset !== null && product.chipsets !== chipset && selectedMotherboard === null && (
                                                <span style={{ color: 'red' }}> (Incompatible with the current chipset)</span>
                                            )}
                                            {typesRam && typesRam !== null && product.types_ram !== typesRam && selectedMotherboard === null && (
                                                <span style={{ color: 'red' }}> (Incompatible with the current ram)</span>
                                            )}
                                        </Card.Text>
                                    )}
                                    {selectedComponent === 'CPU' && (
                                        <Card.Text>
                                            Core: {product.ncore} <br /> Thread: {product.nthreads}
                                            {chipset && chipset !== null && product.chipset !== chipset && selectedCpu === null && (
                                                <span style={{ color: 'red' }}> (Incompatible)</span>
                                            )}
                                        </Card.Text>
                                    )}

                                    {selectedComponent === 'Storage' && <Card.Text>Capacity: {product.storage}Gb</Card.Text>}
                                    {selectedComponent === 'Gpu' && <Card.Text>Architecture: {product.architecture} <br></br> Watt: {product.watt}</Card.Text>}
                                    {selectedComponent === 'Case' && <Card.Text>Height: {product.height} <br></br> Length: {product.length} <br></br> Width: {product.width}</Card.Text>}
                                    {selectedComponent === 'Cpu Cooler' && <Card.Text>Watt: {product.watt}</Card.Text>}

                                    <Button variant="primary" onClick={() => onSelect(product)}>Select</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                </div> 
                
            </div>
            <br />
            <button className="btn btn-primary" onClick={saveBuild}>Save</button>
        </div>
    );
}

export default CreateBuild;
