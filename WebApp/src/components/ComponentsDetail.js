import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DisplayErrors from './DisplayErrors';
import Spinner from 'react-bootstrap/Spinner';

// todo: implement this kind of data in local

function MyVerticallyCenteredModal(props) {
    const [loading, setLoading] = useState(true);
    const [jsonData, setJsonData] = useState(null);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        const url = `https://real-time-product-search.p.rapidapi.com/search?q=${props.header}s&country=IT&language=it`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'faa8169e5bmshc805b15a03a0680p192074jsn12928b8d5226',
                'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
            }
        };
        const data = await fetch(url, options);

        // Check if the status code is not > 400
        if (!data.ok) {
            setError(true);
            setLoading(false);
            return;
        }
        const jsonData = await data.json();
        setJsonData(jsonData);
        setLoading(false);
    };

    useEffect(() => {
        if (props.show) {
            fetchData();
        }
    }, [props.show]);

    if (loading) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.header}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Spinner animation="border" variant="primary" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    } else if (error) {
        return(
            <div>
                <DisplayErrors ErrorHeader="Error" ErrorBody="An error occurred while fetching data" />
            </div>
        );

    } else {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.header}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <img
                        src={jsonData.data[0].product_photos[0]}
                        alt={'Image of ' + props.header}
                        className="img-fluid"
                        style={{maxHeight: '300px', maxWidth: '300px'}}
                    />
                    <h4>Description</h4>
                    <p>{jsonData.data[0].product_description}</p>
                    <h4>Price</h4>
                    <p>
                        From {jsonData.data[0].typical_price_range[0]} to{' '}
                        {jsonData.data[0].typical_price_range[1]}
                    </p>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

function ShowComponentsDetails({ components }) {
    const [modalShow, setModalShow] = React.useState(false);

    const handleButtonClick = () => {
        setModalShow(true);
    };

    return (
        <>
            <Button variant="primary" onClick={handleButtonClick}>
                Details
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                header={components.name}
            />
        </>
    );
}

export default ShowComponentsDetails;
