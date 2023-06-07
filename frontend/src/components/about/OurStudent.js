import React from "react";
//navbar footer
import Navbar from "../navbar";
import Footer from "../Footer";

//css
import "../../style/OurStudent.css";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const OurStudent = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div id="team">
        <Container className="team-container" fluid>
          <Row className="mb-5 d-flex align-items-center justify-content-center">
            <Col className="col-md-5 col-4 home-meet-leftarrow"></Col>
            <Col className="col-md-2 col-3 home-meet-title text-uppercase ">
              our Student
            </Col>
            <Col className="col-md-5 col-4 home-meet-rightarrow"></Col>
          </Row>
          <Row>
            <Col>
              <div className="student-grid-container">
                <div className="student-card">
                  <div className="student-img"></div>
                  <div className="student-detail">
                    <div className="student-name">Sangey lama</div>
                    <div className="student-post">Manager</div>
                  </div>
                </div>

                <div className="student-card">
                  <div className="student-img"></div>
                  <div className="student-detail">
                    <div className="student-name">Sangey lama</div>
                    <div className="student-post">Manager</div>
                  </div>
                </div>

                <div className="student-card">
                  <div className="student-img"></div>
                  <div className="student-detail">
                    <div className="student-name">Sangey lama</div>
                    <div className="student-post">Manager</div>
                  </div>
                </div>

                <div className="student-card">
                  <div className="student-img"></div>
                  <div className="student-detail">
                    <div className="student-name">Sangey lama</div>
                    <div className="student-post">Manager</div>
                  </div>
                </div>

                <div className="student-card">
                  <div className="student-img"></div>
                  <div className="student-detail">
                    <div className="student-name">Sangey lama</div>
                    <div className="student-post">Manager</div>
                  </div>
                </div>

                <div className="student-card">
                  <div className="student-img"></div>
                  <div className="student-detail">
                    <div className="student-name">Sangey lama</div>
                    <div className="student-post">Manager</div>
                  </div>
                </div>

                <div className="student-card">
                  <div className="student-img"></div>
                  <div className="student-detail">
                    <div className="student-name">Sangey lama</div>
                    <div className="student-post">Manager</div>
                  </div>
                </div>

                <div className="student-card">
                  <div className="student-img"></div>
                  <div className="student-detail">
                    <div className="student-name">Sangey lama</div>
                    <div className="student-post">Manager</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default OurStudent;
