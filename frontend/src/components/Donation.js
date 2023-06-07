import React from "react";
//navbar footer
import Navbar from "./navbar";
import Footer from "./Footer";

//css
import "../style/Donation.css";
//router
import { NavLink } from "react-router-dom";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Donation = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div id="donation">
        <Container fluid>
          <Row>
            <Col className="col-12 donation-banner">
              <div className="donation-banner-text">
                <div className="dona-banner-title  donation-red text-capitalize">
                  naksa chhuling
                </div>
                <div className="home-banner-sub-title">Monastery</div>
                <p className="text-capitalize donation-red dona-banner">
                  empowering through education
                </p>
                <NavLink
                  to="/donation/donation-pay"
                  className="home-banner-btn btn text-capitalize"
                >
                  help us Donate now
                </NavLink>
              </div>
            </Col>

            <Col className="dona-about col-12">
              <Row className="dona-row">
                <div className="dona-top">
                  <Col className="col-6 help-grid right-border">
                    <div className="help-icon">
                      <i class="fa-solid fa-hands-holding-child"></i>
                    </div>
                    <div>
                      <div className="help-text text-uppercase">
                        helped children
                      </div>
                      <div className="help-number"> 90</div>
                    </div>
                  </Col>
                  <Col className="col-6 help-grid">
                    <div className="help-icon">
                      <i class="fa-solid fa-book-open-reader"></i>
                    </div>
                    <div>
                      <div className="help-text text-uppercase">education</div>
                      <div className="help-number"> 90</div>
                    </div>
                  </Col>
                </div>
                <Col className="col-12 order-sm-1 order-2 dona-small col-sm-6 bg-white d-flex flex-column align-items-start justify-content-center">
                  <div className="dona-why">
                    Why we need a <span className="donation-red">donation</span>
                  </div>
                  <div className="dona-para">
                    Ngagyur Memorial School is situated at Chandragiri,
                    Kathmandu, Nepal. It was established in 2015 by our founding
                    father Khenchen Tashi Tsering Rinpoche. Starting with almost
                    three hundred students. Now we have more than seven hundred
                    students .His sole purpose to establish school was to bring
                    quality and equitable
                  </div>
                </Col>
                <Col className="col-12 col-sm-6  order-sm-2 order-1 p-0">
                  <div className="dona-img"></div>
                </Col>
                <Col className="col-12 col-sm-6 p-0">
                  <div className="dona-img"></div>
                </Col>
                <Col className="col-12 dona-small col-sm-6 bg-white d-flex flex-column align-items-start justify-content-center">
                  <div className="dona-why">
                    Why we need a <span className="donation-red">donation</span>
                  </div>
                  <div className="dona-para">
                    Ngagyur Memorial School is situated at Chandragiri,
                    Kathmandu, Nepal. It was established in 2015 by our founding
                    father Khenchen Tashi Tsering Rinpoche. Starting with almost
                    three hundred students. Now we have more than seven hundred
                    students .His sole purpose to establish school was to bring
                    quality and equitable
                  </div>
                </Col>
              </Row>
            </Col>

            <Col className=" dona-more col-12">
              <div className="dona-more-bg"></div>
              <div className="row dona-more-img-container">
                <div className="col-12 col-sm-6">
                  <div className="dona-more-img"></div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="dona-more-head donation-red">
                    Small decision <div className="space"></div> can change
                    <div className="space"></div> someone's life
                  </div>
                  <div className="dona-more-para">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Earum eligendi veniam fugit atque porro eius ratione nostrum
                    similique ad reprehenderit est libero illo totam, aspernatur
                    voluptatem sit distinctio corporis commodi debitis dolorem
                    quas? Harum, id odio consequuntur distinctio quos quo
                    accusamus voluptatem unde itaque repellendus qui atque ab
                    amet aperiam! Deserunt impedit beatae vel quaerat id, ad
                    adipisci accusamus molestias natus magnam doloremque quia
                    est necessitatibus quasi odit, dignissimos consequatur,
                    earum accusantium perferendis. Ratione dolores delectus
                    aliquid sint dolor architecto?
                  </div>

                  <NavLink
                    to="/donation/donation-pay"
                    className="home-banner-btn btn text-capitalize"
                  >
                    help us Donate now
                  </NavLink>
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

export default Donation;
