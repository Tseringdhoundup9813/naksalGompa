import React from "react";

//navbar footer
import Navbar from "../navbar";
import Footer from "../Footer";

//css
import "../../style/History.css";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const History = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div id="history">
        <Container fluid>
          <Row className="history-banner">
            <Col className=" col-12 history-main-banner"></Col>
          </Row>
          <Row className="w-90 ms-auto text-end">
            <Col className=" col-4 text-uppercase history-title">history</Col>
          </Row>
          <Row className="history-detail-row">
            <Col className="col-12 col-lg-5 hg-img">
              <div className="history-img-grid">
                <div className="hg-item1"></div>
                <div className="hg-item2"></div>
                <div className="hg-item3"></div>
                <div className="hg-item4"></div>
                <div className="hg-item5"></div>
              </div>

              <div className="hg-line"></div>
              <div className="hg-line2"></div>
            </Col>
            <Col className="col-12 col-lg-7 ps-lg-5">
              <div className="history-detail-title">
                NAKSA CHHULING MONASTERY
              </div>
              <div className="history-detail-para">
                is situated at Chandragiri, Kathmandu, Nepal. It was established
                in 2015 by our founding father Khenchen Tashi Tsering Rinpoche.
                Starting with almost three hundred students. Now we have more
                than seven hundred students .His sole purpose to establish
                school was to bring quality and equitable education among the
                under-privileged children of Himalayan regions. As rate of
                illiteracy was staggering high among that region thus Rinpoche
                always has been determined to eliminate illiteracy and bring
                knowledge and skills to them that will eventually help them to
                find their own place in the society. We provide free education,
                food, accommodation and clothing to our entire students. Our
                School also offers an inquiry based, child centered and
                academically rigorous curriculum that addresses the
                intellectual, social and emotional needs of each child. From
                Nursery to Grade 10 students follow the Primary Years Program
                where the values of the Learner Profile are at the center of the
                school’s mission to develop.
              </div>
              <div className="history-icon">
                <div className="history-fb">
                  <i className="fa-brands fa-square-facebook"></i>
                </div>
                <div className="history-insta">
                  <i class="fa-brands fa-instagram"></i>
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

export default History;
