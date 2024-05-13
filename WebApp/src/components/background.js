import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

const Background = ({ imageSrc, children, TitleText, SignText, link }) => {

  const styleImg = {
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
  };

  const loginBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    padding: '40px', // Aumentato il padding
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '2.5rem', // Aumentata la dimensione della scritta
  };

  const childrenStyle = {
    marginTop: '40px', // Aumentato il margine superiore
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div style={styleImg}>
      <Container fluid>
        <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Col md={4}>
            <div style={loginBoxStyle}>
              <h2 className="mb-4" style={titleStyle}>{TitleText}</h2>
              <div style={childrenStyle}>
                {children}
              </div>
              <a href={link} style={{ textAlign: 'center', display: 'block', marginTop: '20px'}}>{SignText}</a>
            </div>
          </Col>
        </Row>
      </Container>
      
    </div>
  );
};

Background.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Background;
