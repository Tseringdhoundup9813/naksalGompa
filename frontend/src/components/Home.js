import React, { useState, useEffect } from "react";
//css
import "../style/Home.css";
//navbar
import NavbarMain from "./navbar";
//Footer
import Footer from "./Footer";

// ////////////////////////////////////
// axiso import ===========================
import axios from "../Services/Instance";
// =======================================
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
export default function Home() {
  // state ==================================================
  const [bannerpath, set_bannerpath] = useState(undefined);

  console.log(bannerpath !== undefined);

  // ///////////////////////////////////////////////////////////////
  // Fetch api ==================================================================
  useEffect(() => {
    async function fetchbanner() {
      try {
        const response = await axios.get("getbanner");

        set_bannerpath(response.data[0].banner);
      } catch (err) {
        console.log(err);
      }
    }
    fetchbanner();
  });
  // /////////////////////////////////////////////////////////////////////////

  return (
    <div id="home">
      <NavbarMain></NavbarMain>
      {/*home-banner */}
      <div
        className="home-banner container-fluid m-0"
        style={{
          backgroundImage: `url(${
            bannerpath !== undefined ? `"${bannerpath}"` : ""
          })`,
        }}
      >
        <div className="home-banner-text">
          <div className="home-banner-title text-capitalize">
            naksa chhuling
          </div>
          <div className="home-banner-sub-title">Monastery</div>
          <p className="text-capitalize">empowering through education</p>
          <div>
            <NavLink
              to="/donation/donation-pay"
              className="home-banner-btn btn"
            >
              Donate now
            </NavLink>
          </div>
        </div>
      </div>

      {/*home-founder */}
      <Container className="home-founder w-100" fluid>
        <Row className="d-flex home-founder-row mx-auto">
          <Col className="col-md-3 col-lg-3  d-none d-lg-flex align-items-center justify-content-end home-f-main-box">
            <div className="home-f-about">
              <div className=" text-uppercase home-founder-name">founder</div>
              <div className=" text-uppercase home-padding">director</div>
              <div className="text-uppercase home-padding">our team</div>
              <div className=" text-uppercase home-padding">total student</div>
            </div>
            <div className="home-f-box"></div>
          </Col>
          <Col className="col-12 col-md-7 col-lg-6 order-2  d-flex flex-column align-items-start justify-content-center">
            <div className="home-f-title text-uppercase">founder</div>
            <div className="home-f-underline"></div>
            <div className="home-f-name text-capitalize">
              Khenchen Tashi tsering rinpoche
            </div>
            <p className="home-f-para text-justify">
              Late. Ven. Khenchen Tashi Tsering Rinpoche was born in the village
              called Lho, in the Nubri Valley which is located in Gorkha
              district of Nepal, which is also considered the sacred hidden land
              of Guru Padmasambhava. The village is near the hill Rinchen Pungpa
              (Heaped Jewel) located in front of the holy mountain.
            </p>
            <div>
              <NavLink to="/about/founder" className="btn btn-home-f-more">
                Read More
              </NavLink>
            </div>
          </Col>
          <Col className="col-12 col-md-4 me-md-5 me-lg-0 col-lg-3 order-lg-3 order-sm-1 home-f-photo-container">
            <div className="home-f-photo"></div>
            <div className="home-f-line-top d-none d-md-block"></div>
            <div className="home-f-line-bottom d-none d-md-block"></div>
            <div className="home-f-line-left d-none d-md-block"></div>
            <div className="home-f-line-right d-none d-md-block"></div>
          </Col>
        </Row>
      </Container>

      {/*news*/}
      <Container className="home-news" fluid>
        <Row className="home-news-row mx-auto">
          <Col className="col-12 col-lg-8 col-md-7">
            <div className="home-news-type">featured news</div>
            <div className="home-news-type-line"></div>
            <div className="home-news-featured-photo"></div>
            <div className="home-news-f-title">news title</div>
            <div className="home-news-f-para">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam
              inventore quos veritatis, deserunt, quis minima ipsam
              exercitationem id nihil perferendis rerum distinctio blanditiis.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam ex
              ea quae placeat! Quidem sed veniam, quia earum modi ipsa ab eum
              deserunt sit fugiat. Architecto quidem magni saepe veritatis!
            </div>
            <div>
              <NavLink to="/news" className="home-news-f-more ">
                read more <i class="fa-solid fa-angle-right"></i>
              </NavLink>
            </div>
          </Col>
          <Col className="col-12 col-lg-4 col-md-5">
            <div className="home-news-type ">new updates</div>
            <div className="home-news-type-line"></div>

            <div className="home-up-news-container">
              <div className="home-up-image"></div>
              <div className="home-up-detail">
                <div className="home-up-title">this is th title</div>
                <div className="home-up-para">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  eius maiores repellat unde assumenda tempora delectus
                  provident ab facilis quam?
                </div>
              </div>
            </div>

            <div className="home-up-news-container">
              <div className="home-up-image"></div>
              <div className="home-up-detail">
                <div className="home-up-title">this is th title</div>
                <div className="home-up-para">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  eius maiores repellat unde assumenda tempora delectus
                  provident ab facilis quam?
                </div>
              </div>
            </div>

            <div className="home-up-news-container">
              <div className="home-up-image"></div>
              <div className="home-up-detail">
                <div className="home-up-title">this is th title</div>
                <div className="home-up-para">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  eius maiores repellat unde assumenda tempora delectus
                  provident ab facilis quam?
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/*Meet the team */}
      <Container className="home-meet" fluid>
        <Row className="d-flex w-98 mx-auto align-items-center justify-content-center">
          <Col className="col-md-5 col-4 home-meet-leftarrow"></Col>
          <Col className="col-md-2 col-3 home-meet-title text-uppercase ">
            our team
          </Col>
          <Col className="col-md-5 col-4 home-meet-rightarrow"></Col>
        </Row>

        <Row className="home-team-img">
          <div className="home-team-card grid1">
            <div className="home-team-card-img"></div>
            <div className="home-team-card-detail d-flex align-items-center justify-content-center flex-column">
              <div className="home-team-card-name">Khenpo pema thaye</div>
              <div className="home-team-card-post">vice principle</div>
            </div>
          </div>

          <div className="home-team-card home-team-card-down grid2">
            <div className="home-team-card-img"></div>
            <div className="home-team-card-detail d-flex align-items-center justify-content-center flex-column">
              <div className="home-team-card-name">Khenpo pema thaye</div>
              <div className="home-team-card-post">vice principle</div>
            </div>
          </div>

          <div className="home-team-card grid3">
            <div className="home-team-card-img"></div>
            <div className="home-team-card-detail d-flex align-items-center justify-content-center flex-column">
              <div className="home-team-card-name">Khenpo pema thaye</div>
              <div className="home-team-card-post">vice principle</div>
            </div>
          </div>

          <div className="home-team-card home-team-card-down grid4">
            <div className="home-team-card-img"></div>
            <div className="home-team-card-detail d-flex align-items-center justify-content-center flex-column">
              <div className="home-team-card-name">Khenpo pema thaye</div>
              <div className="home-team-card-post">vice principle</div>
            </div>
          </div>

          <div className="home-team-card grid5 ">
            <div className="home-team-card-img"></div>
            <div className="home-team-card-detail d-flex align-items-center justify-content-center flex-column">
              <div className="home-team-card-name">Khenpo pema thaye</div>
              <div className="home-team-card-post">vice principle</div>
            </div>
          </div>
        </Row>
        <Row>
          <Col className="col-5 mx-auto text-center">
            <div>
              <NavLink
                to="/about/our-team"
                className="btn btn-home-f-more"
                preventScrollReset={false}
              >
                see more
              </NavLink>
            </div>
          </Col>
        </Row>
      </Container>

      <Footer></Footer>
    </div>
  );
}
