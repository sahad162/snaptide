import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidenav from '../Components/Sidenav';
import Feeds from '../Components/Feeds'
import Suggestions from '../Components/Suggestions';

function Feedpage() {
  return (
    <div>
        <Container style={{background:'#157EC6',minHeight:'100vh',minWidth:'100vw'}}>
            <Row>
                <Col md={3}>
                <Sidenav/>
                </Col>
                <Col md={6}>
                <Feeds/>
                </Col>
                <Col md={3}>
                <Suggestions/>
                </Col>
            </Row>
        </Container>
      
    </div>
  )
}

export default Feedpage
