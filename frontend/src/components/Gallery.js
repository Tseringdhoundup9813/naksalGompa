import React from "react";
import { useState } from "react";
//navbar footer
import Navbar from "./navbar";
import Footer from "./Footer";

//css
import "../style/Gallery.css";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";

const Gallery = () => {
  const [all, setAll] = useState(true);
  const [events, setEvents] = useState(false);
  const [tour, setTour] = useState(false);
  const [student, setStudents] = useState(false);
  const [award, setAward] = useState(false);
  const [competition, setCompetition] = useState(false);

  const handleAll = () => {
    setAll(true);
    setEvents(false);
    setTour(false);
    setStudents(false);
    setAward(false);
    setCompetition(false);
  };
  const handleEvents = () => {
    setAll(false);
    setEvents(true);
    setTour(false);
    setStudents(false);
    setAward(false);
    setCompetition(false);
  };

  const handleTour = () => {
    setAll(false);
    setEvents(false);
    setTour(true);
    setStudents(false);
    setAward(false);
    setCompetition(false);
  };

  const handleStudent = () => {
    setAll(false);
    setEvents(false);
    setTour(false);
    setStudents(true);
    setAward(false);
    setCompetition(false);
  };

  const handleAward = () => {
    setAll(false);
    setEvents(false);
    setTour(false);
    setStudents(false);
    setAward(true);
    setCompetition(false);
  };
  const handleCompetition = () => {
    setAll(false);
    setEvents(false);
    setTour(false);
    setStudents(false);
    setAward(false);
    setCompetition(true);
  };

  return (
    <div>
      <Navbar />
      <div id="gallery">
        <Container fluid className="p-0">
          <Row className="w-100 m-0 ">
            <Col className="gallery-banner col-12">
              <div className="home-banner-text">
                <div className="home-banner-title text-capitalize">
                  naksa chhuling
                </div>
                <div className="home-banner-sub-title">Monastery</div>
                <p className="text-capitalize">empowering through education</p>
                <NavLink
                  to="/donation/donation-pay"
                  className="gallery-banner-btn btn"
                >
                  Help Us Donate now
                </NavLink>
              </div>
            </Col>
            <Col className="gall-nav-container col-12">
              <div
                className="gall-nav-link"
                onClick={handleAll}
                style={{
                  backgroundColor: `${all ? "#851616" : ""}`,
                  color: `${all ? "#f9d974" : "#62615f"}`,
                }}
              >
                All
              </div>
              <div
                className="gall-nav-link"
                onClick={handleEvents}
                style={{
                  backgroundColor: `${events ? "#851616" : ""}`,
                  color: `${events ? "#f9d974" : "#62615f"}`,
                }}
              >
                Events
              </div>
              <div
                className="gall-nav-link"
                onClick={handleTour}
                style={{
                  backgroundColor: `${tour ? "#851616" : ""}`,
                  color: `${tour ? "#f9d974" : "#62615f"}`,
                }}
              >
                Educational Tours
              </div>
              <div
                className="gall-nav-link"
                onClick={handleStudent}
                style={{
                  backgroundColor: `${student ? "#851616" : ""}`,
                  color: `${student ? "#f9d974" : "#62615f"}`,
                }}
              >
                Students Projects
              </div>
              <div
                className="gall-nav-link"
                onClick={handleAward}
                style={{
                  backgroundColor: `${award ? "#851616" : ""}`,
                  color: `${award ? "#f9d974" : "#62615f"}`,
                }}
              >
                Award ceremony
              </div>
              <div
                className="gall-nav-link"
                onClick={handleCompetition}
                style={{
                  backgroundColor: `${competition ? "#851616" : ""}`,
                  color: `${competition ? "#f9d974" : "#62615f"}`,
                }}
              >
                competitions
              </div>
            </Col>

            {all && (
              <Col className="col-12 gall-view">
                <div className="gall-grid-container">
                  <div className="gall-grid-item gall-item"></div>
                  <div className="gall-grid-item1 gall-item"></div>
                  <div className="gall-grid-item2 gall-item"></div>
                  <div className="gall-grid-item3 gall-item"></div>
                  <div className="gall-grid-item4 gall-item"></div>
                  <div className="gall-grid-item5 gall-item"></div>
                </div>

                <div className="gall-more">
                  <span>load more</span>
                </div>
              </Col>
            )}
            {events && (
              <Col className="col-12 gall-view">
                <div className="gall-grid-container">
                  <div className="gall-grid-item gall-item"></div>
                  <div className="gall-grid-item1 gall-item"></div>
                  <div className="gall-grid-item2 gall-item"></div>
                  <div className="gall-grid-item5 gall-item"></div>
                </div>

                <div className="gall-more">
                  <span>load more</span>
                </div>
              </Col>
            )}
            {tour && (
              <Col className="col-12 gall-view">
                <div className="gall-grid-container">
                  <div className="gall-grid-item3 gall-item"></div>
                  <div className="gall-grid-item4 gall-item"></div>
                  <div className="gall-grid-item5 gall-item"></div>
                </div>

                <div className="gall-more">
                  <span>load more</span>
                </div>
              </Col>
            )}
            {student && (
              <Col className="col-12 gall-view">
                <div className="gall-grid-container">
                  <div className="gall-grid-item gall-item"></div>
                  <div className="gall-grid-item1 gall-item"></div>
                  <div className="gall-grid-item2 gall-item"></div>
                </div>

                <div className="gall-more">
                  <span>load more</span>
                </div>
              </Col>
            )}
            {award && (
              <Col className="col-12 gall-view">
                <div className="gall-grid-container">
                  <div className="gall-grid-item gall-item"></div>
                  <div className="gall-grid-item1 gall-item"></div>
                  <div className="gall-grid-item2 gall-item"></div>
                  <div className="gall-grid-item5 gall-item"></div>
                </div>

                <div className="gall-more">
                  <span>load more</span>
                </div>
              </Col>
            )}
            {competition && (
              <Col className="col-12 gall-view">
                <div className="gall-grid-container">
                  <div className="gall-grid-item gall-item"></div>
                  <div className="gall-grid-item1 gall-item"></div>
                  <div className="gall-grid-item2 gall-item"></div>
                  <div className="gall-grid-item3 gall-item"></div>
                </div>

                <div className="gall-more">
                  <span>load more</span>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
