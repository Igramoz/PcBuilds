import React from 'react';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import DisplayErrors from './DisplayErrors';

const url = 'http://localhost:3001/';

//fetch all builds of the user logged in

async function DeleteBuild(idbuild, iduserbuild) {
    const response = fetch(url + 'user_builds/' + parseInt(iduserbuild), {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res = await response;
    //controlla se non restituisca 404

    if (res.status === 404) {
        //display error message
        
    }else{
        const response2 = fetch(url + 'builds/' + parseInt(idbuild), {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const res2 = await response2;
        //controlla se non restituisca 404
        if (res2.status === 404) {
            //display error message
        }else{
            window.location.reload();
        }

    }
}


async function fetchBuilds() {
    const email = localStorage.getItem('email');

    const response = fetch(url + 'user_builds/user/' + email, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    //controlla se non restituisca 404

    const res = await response;
    if (res.status === 404) {
        return [];
    }
    return res.json();
}

async function fetchBuildData(id) {
    const response = fetch(url + 'builds/' + parseInt(id), {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res = await response;
    return res.json();
}

async function fetchCpu(id) {
    const response = fetch(url + 'components/cpus/' + parseInt(id), {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res = await response;
    return res.json();
}

async function fetchMotherboard(id) {
    const response = fetch(url + 'components/motherboard/' + parseInt(id), {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res = await response;
    return res.json();

}

async function fetchRam(id) {
    const response = fetch(url + 'components/ram/' + parseInt(id), {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res = await response;
    return res.json();
}

async function fetchStorage(id) {
    const response = fetch(url + 'components/storage/' + parseInt(id), {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res = await response;
    return res.json();

}

async function fetchCase(id) {
    const response = fetch(url + 'components/case/' + parseInt(id), {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res = await response;
    return res.json();
}

async function fetchPsu(id) {
    const response = fetch(url + 'components/psu/' + parseInt(id), {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res = await response;
    return res.json();
}

async function fetchGpu(id) {
    const response = fetch(url + 'components/gpus/' + parseInt(id), {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res = await response;
    return res.json();
}

async function fetchCpuCooler(id) {
    const response = fetch(url + 'components/cpu_coolers/' + parseInt(id), {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const res = await response;
    return res.json();
}





function ShowUsersBuilds() {

    const [hasBuild, setHasBuild] = useState(false);
    const [buildsData, setBuildsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            const builds = await fetchBuilds();
    
            if (builds.length === 0){
                setLoading(false);
                setHasBuild(false);
            }else{
                setHasBuild(true);
                
                const data = [];

                for (let i = 0; i < builds.length; i++){
                    const buildData = await fetchBuildData(builds[i].builds);
                    data.push(buildData);
                }


                //array di oggetti con i dati dei componenti

                const components = [];
                
                for (let i = 0; i < data.length; i++){
                    const cpu = await fetchCpu(data[i].cpu);
                    const motherboard = await fetchMotherboard(data[i].motherboard);
                    const ram = await fetchRam(data[i].ram);
                    const storage = await fetchStorage(data[i].storage);
                    const pc_case = await fetchCase(data[i].casepc);
                    const psu = await fetchPsu(data[i].psu);
                    const gpu = await fetchGpu(data[i].gpu);
                    const cpu_cooler = await fetchCpuCooler(data[i].cpu_cooler);

                    components.push({
                        cpu: cpu,
                        motherboard: motherboard,
                        ram: ram,
                        storage: storage,
                        pc_case: pc_case,
                        psu: psu,
                        gpu: gpu,
                        cpu_cooler: cpu_cooler,
                        build: builds[i].builds,
                        id: builds[i].id
                    });
                }

                setBuildsData(components);

                console.log(components);
                //loading diventa false

                setLoading(false);

            }
        };
    
        fetchData();

    }, [fetchBuilds, fetchBuildData]);


    if (hasBuild === false){
        return (
            <div>
                <DisplayErrors ErrorHeader="No builds found" ErrorBody="You have no builds yet." />
            </div>
        );
    }else if (loading === true){
        return (
            <div>
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }
    else{
        return (
            <div>
                {Array.isArray(buildsData) && buildsData.map((build, index) => {
                    return (
                        <Container key={index}>
                            <Card>
                                <Card.Body>
                                <Card.Title>Build {index + 1}</Card.Title>
                                <br />
                                <Row>
                                    <Col>
                                    <Card.Subtitle>CPU</Card.Subtitle>
                                    <Card.Text>{build.cpu.name}</Card.Text>
                                    <br />
                                    </Col>
                                    <Col>
                                    <Card.Subtitle>Motherboard</Card.Subtitle>
                                    <Card.Text>{build.motherboard.name}</Card.Text>
                                    <br />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Card.Subtitle>RAM</Card.Subtitle>
                                    <Card.Text>{build.ram.name}</Card.Text>
                                    <br />
                                    </Col>
                                    <Col>
                                    <Card.Subtitle>Storage</Card.Subtitle>
                                    <Card.Text>{build.storage.name}</Card.Text>
                                    <br />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Card.Subtitle>Case</Card.Subtitle>
                                    <Card.Text>{build.pc_case.name}</Card.Text>
                                    <br />
                                    </Col>
                                    <Col>
                                    <Card.Subtitle>PSU</Card.Subtitle>
                                    <Card.Text>{build.psu.name}</Card.Text>
                                    <br />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <Card.Subtitle>GPU</Card.Subtitle>
                                    <Card.Text>{build.gpu.name}</Card.Text>
                                    <br />
                                    </Col>
                                    <Col>
                                    <Card.Subtitle>CPU Cooler</Card.Subtitle>
                                    <Card.Text>{build.cpu_cooler.name}</Card.Text>
                                    <br />
                                    </Col>
                                </Row>
                                <Button variant="primary" onClick={() => DeleteBuild(build.build, build.id)}>
                                    Delete
                                </Button>
                                </Card.Body>
                               
                            </Card>
                           
                        </Container>
                    );
                })}            
            </div>
        );
    }
}

export default ShowUsersBuilds;