import React from "react";
//css
import "../style/Footer.css";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function Footer() {
  return (
    <div id="footer">
      <Container fluid className="footer-container">
        <Row className="footer-row">
          <Col className="col-md-4 footer-small mx-auto">
            <div className="footer-head text-capitalize">Address</div>
            <div className="footer-list text-capitalize">thankot</div>
            <div className="footer-list text-capitalize">kathmandu, nepal</div>
            <div className="footer-head text-capitalize">follow us</div>
            <div className="footer-icon">
              <div className="footer-fb nav-link">
                <i className="fa-brands fa-square-facebook"></i>
              </div>
              <div className="footer-insta nav-link">
                <i class="fa-brands fa-instagram"></i>
              </div>
            </div>
          </Col>
          <Col className="col-md-4 footer-small mx-auto">
            <div className="footer-head text-capitalize">contact info</div>
            <div className="footer-list text-capitalize">+977 9817648229</div>
            <div className="footer-list ">sangeylama1000@gmail.com</div>
          </Col>
          <Col className="col-md-4 footer-small mx-auto">
            <div className="footer-head text-capitalize ">quick links</div>
            <div className="footer-list text-capitalize">About us</div>
            <div className="footer-list text-capitalize">dontaion</div>
            <div className="footer-list text-capitalize">news events</div>
            <div className="footer-list text-capitalize">contact us</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
