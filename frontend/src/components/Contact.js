import React from "react";
import { useState } from "react";
//navbar footer
import Navbar from "./navbar";
import Footer from "./Footer";

//css
import "../style/Contact.css";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Gallery = () => {
  return (
    <div>
      <Navbar />
      <div id="Contact">
        <Container className="p-0" fluid>
          <Row className="m-0">
            <Col className="col-12 contact-banner">
              <div className="cb-center">
                <div className="cb-head">Contact Information</div>
                <div className="cb-para">
                  Ngagyur Memorial School is situated at Chandragiri, Kathmandu,
                  Nepal. It was established in 2015 by our founding father
                  Khenchen Tashi Tsering Rinpoche.
                </div>
                <div className="cb-btn">
                  <span>Contact US</span>
                </div>
              </div>
            </Col>
            <Col className="col-12 contact-msg">
              <Row className=" contact-row">
                <Col className="col-lg-4 order-2 order-lg-1 col-12 c-list">
                  <div className="c-phone">
                    <div className="c-icon">
                      <div>
                        <i class="fa-solid fa-phone"></i>
                      </div>
                    </div>
                    <div className="c-p-detail">
                      <div className="c-ph">Phone</div>
                      <div className="c-num">+977 987123902</div>
                    </div>
                  </div>
                  <div className="c-phone">
                    <div className="c-icon">
                      <div>
                        <i class="fa-regular fa-envelope"></i>
                      </div>
                    </div>
                    <div className="c-p-detail">
                      <div className="c-ph">email</div>
                      <div className="c-num">sami2001@gmail.com</div>
                    </div>
                  </div>
                  <div className="c-phone ">
                    <div className="c-icon">
                      <div>
                        <i class="fa-solid fa-fax"></i>
                      </div>
                    </div>
                    <div className="c-p-detail">
                      <div className="c-ph">Fax</div>
                      <div className="c-num">987123902</div>
                    </div>
                  </div>

                  <div className="c-phone">
                    <div className="c-icon">
                      <div>
                        <i class="fa-solid fa-location-dot"></i>
                      </div>
                    </div>
                    <div className="c-p-detail">
                      <div className="c-ph">Location</div>
                      <div className="c-num">Gorkha, nepal</div>
                    </div>
                  </div>
                </Col>
                <Col className="col-lg-8 order-1 order-lg-2 col-12 c-msg">
                  <div className="c-msg-head">Send message</div>
                  <div className="c-msg-para">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Deleniti deserunt consequatur ipsam sunt repellat! Eius
                    consequatur quam autem voluptatem minus.
                  </div>
                  <form action="">
                    <div className="c-msg-name">
                      <div>
                        <input
                          type="text"
                          className="c-input"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="c-input"
                          placeholder="Your Email"
                        />
                      </div>
                    </div>
                    <div className="c-msg-name">
                      <div>
                        <input
                          type="text"
                          className="c-input"
                          placeholder="Phone Number"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="c-input"
                          placeholder="Subject"
                        />
                      </div>
                    </div>

                    <div className="c-msg-main">
                      <textarea
                        type="text"
                        className="c-msg-box"
                        placeholder="Enter your Message"
                      />
                    </div>
                    <div className="msg-submit">
                      <span>send message</span>
                    </div>
                  </form>
                </Col>
              </Row>
            </Col>
            <Col className="col-12 contact-map ">
              <div className="map-head">find us on google maps</div>
              <div className="map-para">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                voluptatum saepe asperiores nihil exercitationem ut accusantium
                ducimus quasi fugit? Blanditiis?
              </div>

              <div className="map-main">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14128.309187279885!2d85.2903957!3d27.7148996!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb188d9b82c8ad%3A0xae31bde410797bf7!2sSwoyambhu%20Mahachaitya!5e0!3m2!1sen!2snp!4v1686074447381!5m2!1sen!2snp"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  className="google-map"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
