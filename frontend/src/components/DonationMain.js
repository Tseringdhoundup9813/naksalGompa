import React from "react";
//navbar footer
import Navbar from "./navbar";
import Footer from "./Footer";

//css
import "../style/DonationMain.css";

import khaltiimg from "../images/logo/khalti.png";
import esewaimg from "../images/logo/esewa.jpg";
import imepayimg from "../images/logo/imePay.png";
import { useState } from "react";
const Donation = () => {
  const [khalti, setKhalti] = useState(true);
  const [esewa, setEsewa] = useState(false);
  const [imepay, setImepay] = useState(false);

  const [info, setInfo] = useState(false);
  const [pay, setPay] = useState(true);
  const [sum, setSum] = useState(false);

  const handleKhalti = () => {
    setKhalti(true);
    setEsewa(false);
    setImepay(false);
  };
  const handleEsewa = () => {
    setKhalti(false);
    setEsewa(true);
    setImepay(false);
  };
  const handleImepay = () => {
    setKhalti(false);
    setEsewa(false);
    setImepay(true);
  };

  const handleinfo = () => {
    setInfo(true);
    setPay(false);
    setSum(false);
  };
  const handlepay = () => {
    setInfo(false);
    setPay(true);
    setSum(false);
  };
  const handlesum = () => {
    setInfo(false);
    setPay(false);
    setSum(true);
  };
  return (
    <div>
      <Navbar></Navbar>
      <div id="donation-main">
        <div className="dmain-red"></div>
        <div className="dmain-white">
          <div className="pay-container">
            <div className="pay-top d-flex">
              <div
                className="pay-account"
                onClick={handleinfo}
                style={{
                  color: `${info ? "#851616" : "#fff"}`,
                  borderBottom: ` ${info ? " 2px solid #851616" : "none"}`,
                }}
              >
                <div className="pay-checkbox">
                  <i class="fa-solid fa-square-check"></i>
                </div>
                <div className="pay-title">account info</div>
              </div>
              <div
                className="pay-scan "
                onClick={handlepay}
                style={{
                  color: `${pay ? "#851616" : "#fff"}`,
                  borderBottom: ` ${pay ? " 2px solid #851616" : "none"}`,
                }}
              >
                <div className="pay-checkbox">
                  <i class="fa-solid fa-square-check"></i>
                </div>
                <div className="pay-title">payment method</div>
              </div>
              <div
                className="pay-sum"
                onClick={handlesum}
                style={{
                  color: `${sum ? "#851616" : "#fff"}`,
                  borderBottom: ` ${sum ? " 2px solid #851616" : "none"}`,
                }}
              >
                <div className="pay-checkbox">
                  <i class="fa-solid fa-square-check"></i>
                </div>
                <div className="pay-title">payment summary</div>
              </div>
            </div>
            <div className="pay-bottom-container">
              {pay && (
                <div className="pay-bottom">
                  <div className="pay-left">
                    <div
                      className="khalti"
                      onClick={handleKhalti}
                      style={{
                        backgroundColor: `${khalti ? "transparent" : ""}`,
                        color: `${khalti ? "black" : "#fff"}`,
                      }}
                    >
                      <img src={khaltiimg} className="img-fluid" /> khalti
                    </div>
                    <div
                      className="esewa"
                      onClick={handleEsewa}
                      style={{
                        backgroundColor: `${esewa ? "transparent" : ""}`,
                        color: `${esewa ? "black" : "#fff"}`,
                      }}
                    >
                      <img src={esewaimg} className="img-fluid " /> esewa
                    </div>
                    <div
                      className="imepay"
                      onClick={handleImepay}
                      style={{
                        backgroundColor: `${imepay ? "transparent" : ""}`,
                        color: `${imepay ? "black" : "#fff"}`,
                      }}
                    >
                      <img src={imepayimg} className="img-fluid" /> IMEpay
                    </div>
                  </div>
                  <div className="pay-right">
                    {khalti && (
                      <div>
                        <div className="pay-right-head">Khalti</div>
                        <div className="pay-name">
                          Name : naksachullinggumba
                        </div>
                        <div className="pay-number">
                          Number : +977 9817495000
                        </div>
                        <div className="pay-qr"></div>
                      </div>
                    )}
                    {esewa && (
                      <div>
                        <div className="pay-right-head">esewa</div>
                        <div className="pay-name">
                          Name : naksachullinggumba
                        </div>
                        <div className="pay-number">
                          Number : +977 9817495000
                        </div>
                        <div className="pay-qr"></div>
                      </div>
                    )}
                    {imepay && (
                      <div>
                        <div className="pay-right-head">imepay</div>
                        <div className="pay-name">
                          Name : naksachullinggumba
                        </div>
                        <div className="pay-number">
                          Number : +977 9817495000
                        </div>
                        <div className="pay-qr"></div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {info && (
                <div className="pay-bottom">
                  <div className="pay-left">
                    <div
                      className="esewa"
                      onClick={handleEsewa}
                      style={{
                        backgroundColor: `${esewa ? "transparent" : ""}`,
                        color: `${esewa ? "black" : "#fff"}`,
                      }}
                    >
                      <img src={esewaimg} className="img-fluid " /> New
                    </div>
                    <div
                      className="imepay"
                      onClick={handleImepay}
                      style={{
                        backgroundColor: `${imepay ? "transparent" : ""}`,
                        color: `${imepay ? "black" : "#fff"}`,
                      }}
                    >
                      <img src={imepayimg} className="img-fluid" /> IMEpay
                    </div>
                  </div>
                  <div className="pay-right">
                    {khalti && (
                      <div>
                        <div className="pay-right-head">Khalti</div>
                        <div className="pay-name">
                          Name : naksachullinggumba
                        </div>
                        <div className="pay-number">
                          Number : +977 9817495000
                        </div>
                        <div className="pay-qr"></div>
                      </div>
                    )}
                    {esewa && (
                      <div>
                        <div className="pay-right-head">esewa</div>
                        <div className="pay-name">
                          Name : naksachullinggumba
                        </div>
                        <div className="pay-number">
                          Number : +977 9817495000
                        </div>
                        <div className="pay-qr"></div>
                      </div>
                    )}
                    {imepay && (
                      <div>
                        <div className="pay-right-head">imepay</div>
                        <div className="pay-name">
                          Name : naksachullinggumba
                        </div>
                        <div className="pay-number">
                          Number : +977 9817495000
                        </div>
                        <div className="pay-qr"></div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {sum && (
                <div className="pay-bottom">
                  <div className="pay-left">
                    <div
                      className="khalti"
                      onClick={handleKhalti}
                      style={{
                        backgroundColor: `${khalti ? "transparent" : ""}`,
                        color: `${khalti ? "black" : "#fff"}`,
                      }}
                    >
                      <img src={khaltiimg} className="img-fluid" /> khalti
                    </div>
                    <div
                      className="esewa"
                      onClick={handleEsewa}
                      style={{
                        backgroundColor: `${esewa ? "transparent" : ""}`,
                        color: `${esewa ? "black" : "#fff"}`,
                      }}
                    >
                      <img src={esewaimg} className="img-fluid " /> esewa
                    </div>
                    <div
                      className="imepay"
                      onClick={handleImepay}
                      style={{
                        backgroundColor: `${imepay ? "transparent" : ""}`,
                        color: `${imepay ? "black" : "#fff"}`,
                      }}
                    >
                      <img src={imepayimg} className="img-fluid" /> IMEpay
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Donation;
