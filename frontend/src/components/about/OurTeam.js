import React from "react";
//navbar footer
import Navbar from "../navbar";
import Footer from "../Footer";

//css
import "../../style/OurTeam.css";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const OurTeam = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div id="team">
        <Container className="team-container" fluid>
          <Row className="mb-5 d-flex align-items-center justify-content-center">
            <Col className="col-md-5 col-4 home-meet-leftarrow"></Col>
            <Col className="col-md-2 col-3 home-meet-title text-uppercase ">
              our team
            </Col>
            <Col className="col-md-5 col-4 home-meet-rightarrow"></Col>
          </Row>
          <Row className="team-row">
            <Col className="col-12">
              <div className="team-tree">
                <div className="team-head">
                  <div className="team-img"></div>
                  <div className="team-img-after"></div>
                  <div className="team-detail">
                    <div className="team-name"> khenpo pema thyee</div>
                    <div className="team-post">vice principle</div>
                  </div>
                </div>
                <div className="team-up-container">
                  <div className="team team-up">
                    <div className="team-img"></div>
                    <div className="team-img-after"></div>
                    <div className="team-detail">
                      <div className="team-name"> khenpo pema thyee</div>
                      <div className="team-post">vice principle</div>
                    </div>
                  </div>
                  <div className="team team-up">
                    <div className="team-img"></div>
                    <div className="team-img-after"></div>
                    <div className="team-detail">
                      <div className="team-name"> khenpo pema thyee</div>
                      <div className="team-post">vice principle</div>
                    </div>
                  </div>
                  <div className="team team-up">
                    <div className="team-img"></div>
                    <div className="team-img-after"></div>
                    <div className="team-detail">
                      <div className="team-name"> khenpo pema thyee</div>
                      <div className="team-post">vice principle</div>
                    </div>
                  </div>
                  <div className="team team-up">
                    <div className="team-img"></div>
                    <div className="team-img-after"></div>
                    <div className="team-detail">
                      <div className="team-name"> khenpo pema thyee</div>
                      <div className="team-post">vice principle</div>
                    </div>
                  </div>
                </div>
                <div className="team-down-container">
                  <div className="team team-down">
                    <div className="team-img"></div>
                    <div className="team-img-after"></div>
                    <div className="team-detail">
                      <div className="team-name"> khenpo pema thyee</div>
                      <div className="team-post">vice principle</div>
                    </div>
                  </div>
                  <div className="team team-down">
                    <div className="team-img"></div>
                    <div className="team-img-after"></div>
                    <div className="team-detail">
                      <div className="team-name"> khenpo pema thyee</div>
                      <div className="team-post">vice principle</div>
                    </div>
                  </div>
                  <div className="team team-down">
                    <div className="team-img"></div>
                    <div className="team-img-after"></div>
                    <div className="team-detail">
                      <div className="team-name"> khenpo pema thyee</div>
                      <div className="team-post">vice principle</div>
                    </div>
                  </div>
                  <div className="team team-down">
                    <div className="team-img"></div>
                    <div className="team-img-after"></div>
                    <div className="team-detail">
                      <div className="team-name"> khenpo pema thyee</div>
                      <div className="team-post">vice principle</div>
                    </div>
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

export default OurTeam;
