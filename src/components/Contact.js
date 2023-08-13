import React, { useState, useReducer, useEffect, useRef } from "react";

//navbar footer
import Navbar from "./navbar";
import Footer from "./Footer";
import { INITIAL_STATE, postReducer } from "../Reducer/NewsReducer";

//css
import "../style/Contact.css";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "../Services/Instance";

const Gallery = () => {
  const [contact_state, contact_dispatch] = useReducer(
    postReducer,
    INITIAL_STATE
  );
  const [contact, set_contact] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  async function SendMessage(event) {
    event.preventDefault();
    const formdata = new FormData();

    formdata.append("name", contact.name);
    formdata.append("email", contact.email);
    formdata.append("phone", contact.phone);
    formdata.append("subject", contact.subject);
    formdata.append("message", contact.message);

    try {
      contact_dispatch({ type: "FETCH_START" });
      const reponse = await axios.post("sendmessage", formdata);

      if (reponse.data.success) {
        // after successfully submit empty the input field and file field

        contact_dispatch({ type: "FETCH_SUCCESS", payload: [true] });
        console.log(reponse.data);

        setTimeout(function () {
          contact_dispatch({ type: "FETCH_SUCCESS", payload: [false] });
        }, 9200);
      }
    } catch (err) {
      console.log(err);
      console.log(err.message !== "Network Error");

      if (err.message !== "Network Error") {
        contact_dispatch({
          type: "FETCH_ERROR",
          payload: [err.response.data.message, err.response.data.emptyfield],
        });
        console.log(err.response.data.emptyfield);
      }
    }
  }

  console.log(contact_state.success);

  return (
    <div>
      {/* 

      */}
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
                {/* <div className="cb-btn">
                  <span>Contact US</span>
                </div> */}
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
                        <i class="fa-solid fa-location-arrow"></i>
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
                  <form action="" onSubmit={SendMessage}>
                    {/* sucessfull added message  */}

                    {contact_state.success && contact_state.success ? (
                      <div className="contact-submit-sucess-message">
                        <p>Sucessfully send message</p>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* //////////////////////////////////////////////////////////////////////// */}
                    <div className="c-msg-name">
                      <div>
                        <input
                          type="text"
                          className="c-input"
                          placeholder="Your Name"
                          onChange={e =>
                            set_contact({ ...contact, name: e.target.value })
                          }
                          style={{
                            border: `${
                              contact_state.empty_field &&
                              contact_state.empty_field.includes("name")
                                ? "2px solid red"
                                : ""
                            }`,
                          }}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          className="c-input"
                          placeholder="Your Email"
                          onChange={e =>
                            set_contact({ ...contact, email: e.target.value })
                          }
                          style={{
                            border: `${
                              contact_state.empty_field &&
                              contact_state.empty_field.includes("email")
                                ? "2px solid red"
                                : ""
                            }`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="c-msg-name">
                      <div>
                        <input
                          type="number"
                          className="c-input"
                          placeholder="Phone Number"
                          onChange={e =>
                            set_contact({ ...contact, phone: e.target.value })
                          }
                          style={{
                            border: `${
                              contact_state.empty_field &&
                              contact_state.empty_field.includes("phone")
                                ? "2px solid red"
                                : ""
                            }`,
                          }}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          inputMode="numeric"
                          className="c-input"
                          placeholder="Subject"
                          onChange={e =>
                            set_contact({ ...contact, subject: e.target.value })
                          }
                          style={{
                            border: `${
                              contact_state.empty_field &&
                              contact_state.empty_field.includes("subject")
                                ? "2px solid red"
                                : ""
                            }`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="c-msg-main">
                      <textarea
                        type="text"
                        className="c-msg-box"
                        placeholder="Enter your Message"
                        onChange={e =>
                          set_contact({ ...contact, message: e.target.value })
                        }
                        style={{
                          border: `${
                            contact_state.empty_field &&
                            contact_state.empty_field.includes("message")
                              ? "2px solid red"
                              : ""
                          }`,
                        }}
                      />
                    </div>
                    {contact_state.error && contact_state.error ? (
                      <div className="category-submit-message">
                        <p>
                          {" "}
                          {contact_state.error_message &&
                            contact_state.error_message}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="msg-submit">
                      <button className="btn btn-danger">Send message</button>
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
