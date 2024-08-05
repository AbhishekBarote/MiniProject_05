import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Aboutus.css'; 
import aboutlogo from '../../assets/revolution-e-waste.webp';

const AboutUs = () => {
  return (
    <section className="about-us py-5">
      <Container>
        <Row>
          <h4 className="text-center text-success fw-bold">-About ELocate-</h4>
          <h2 className="text-center font-weight-bold">Revolutionizing E-Waste Locator and Management</h2>
          <Col md={6} className="d-flex align-items-center">
            <div>
              <p className='fw-bold'>
                In India, the improper disposal of e-waste contributes to the alarming annual collection of 1.71 million metric tons. Locating trustworthy e-waste collection facilities remains a significant challenge, intensifying this environmental issue.
              </p>
              <p className='fw-bold'>
                The ELocate Web Platform is conceived to directly address this issue. Our platform offers a dynamic, user-friendly interface for individuals and businesses seeking reliable e-waste collection facilities.
              </p>
              <div className="d-flex mt-3">
                <Button className="btn btn-success mr-2 fw-bold b">CONTACT US</Button>
                <Button className='btn btn-success ms-3 fw-bold b'>RECYCLING SERVICES</Button>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <img src={aboutlogo} alt="E-Waste Management" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
