import React, { useState, useEffect, useReducer } from "react";
import { INITIAL_STATE, postReducer } from "../Reducer/NewsReducer";
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
import parse from "html-react-parser";

//animation on scroll
import AOS from "aos";
import "aos/dist/aos.css";
export default function Home() {
  // state ==================================================
  const [bannerpath, set_bannerpath] = useState(undefined);
  const [feturenews, set_feturenews] = useState();

  // stat
  // news reducer state
  const [getnews_state, getnews_dispatch] = useReducer(
    postReducer,
    INITIAL_STATE
  );
  const [team_state, team_dispatch] = useReducer(postReducer, INITIAL_STATE);
  const [founder_state, founder_dispatch] = useReducer(
    postReducer,
    INITIAL_STATE
  );

  // /////////////////////////////////////////////////

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
      AOS.init();
    }
    fetchbanner();

    // //////////////////////////////////////////////////////////////////////////////
    // get a news recent list
    async function GetNews() {
      getnews_dispatch({ type: "FETCH_START" });
      try {
        const response = await axios.get("/getnews/");
        console.log(response);
        // console.log(response)
        if (response.data.success) {
          var all_news_data = response.data.data;
          console.log(all_news_data.length);
          set_feturenews([all_news_data[0]]);

          if (all_news_data.length > 3) {
            all_news_data = [
              all_news_data[1],
              all_news_data[2],
              all_news_data[3],
            ];
          } else if (all_news_data.length < 4 && all_news_data.length > 2) {
            console.log("workng");
            all_news_data = [all_news_data[1], all_news_data[2]];
          } else if (all_news_data.length < 3 && all_news_data.length > 1) {
            console.log("two left");
            all_news_data = [all_news_data[1]];
          } else {
            all_news_data = [];
          }

          getnews_dispatch({
            type: "FETCH_SUCCESS",
            payload: [true, all_news_data],
          });
        }
      } catch (err) {
        console.log(err);
        if (err.message !== "Network Error") {
          getnews_dispatch({
            type: "FETCH_ERROR",
            payload: [err.response.data.message, err.response.data.emptyfield],
          });
          console.log(err.response.data.emptyfield);
        }
      }
    }

    //
    GetNews();
    // ///////////////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////////////////

    async function GetTeam() {
      team_dispatch({ type: "FETCH_START" });
      try {
        const response = await axios.get("/getteam");
        // console.log(response)
        if (response.data.success) {
          const all_data = response.data.data;
          team_dispatch({ type: "FETCH_SUCCESS", payload: [true, all_data] });
        }
      } catch (err) {
        console.log(err);
        if (err.message !== "Network Error") {
          team_dispatch({
            type: "FETCH_ERROR",
            payload: [err.response.data.message, err.response.data.emptyfield],
          });
          console.log(err.response.data.emptyfield);
        }
      }
    }

    //
    GetTeam();

    async function GetFounder() {
      founder_dispatch({ type: "FETCH_START" });
      try {
        const response = await axios.get("/getfounder");
        // console.log(response)
        if (response.data.success) {
          const all_data = response.data.data;
          console.log(all_data);
          founder_dispatch({
            type: "FETCH_SUCCESS",
            payload: [true, all_data],
          });
        }
      } catch (err) {
        console.log(err);
        if (err.message !== "Network Error") {
          founder_dispatch({
            type: "FETCH_ERROR",
            payload: [err.response.data.message, err.response.data.emptyfield],
          });
          console.log(err.response.data.emptyfield);
        }
      }
    }

    //
    GetFounder();

    // ///////////////////////////////////////////////
  }, []);
  // /////////////////////////////////////////////////////////////////////////

  console.log(feturenews);
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
          <Col
            data-aos="fade-up"
            className="col-md-3 col-lg-3  d-none d-lg-flex align-items-center justify-content-end home-f-main-box"
          >
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
              {founder_state.data[0] && founder_state.data[0].name}
            </div>
            <p className="home-f-para text-justify">
              {founder_state.data[0] ? parse(founder_state.data[0].des) : ""}
            </p>
            <div>
              <NavLink to="/about/founder" className="btn btn-home-f-more">
                Read More
              </NavLink>
            </div>
          </Col>
          <Col className="col-12 col-md-4 me-md-5 me-lg-0 col-lg-3 order-lg-3 order-sm-1 home-f-photo-container">
            <div
              data-aos="flip-right"
              className="home-f-photo"
              style={{
                backgroundImage: `url(${
                  founder_state.data[0] && founder_state.data[0].photo
                })`,
              }}
            ></div>
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
            <div
              data-aos="fade-right"
              className="home-news-featured-photo"
              style={{
                backgroundImage: `url("${feturenews && feturenews[0].photo}")`,
              }}
            ></div>
            <div className="home-news-f-title">
              {feturenews && feturenews[0].title}
            </div>
            <div className="home-news-f-para">
              {feturenews && feturenews[0].des.slice(0, 300)}{" "}
              {feturenews && feturenews[0].des.length > 300
                ? ". . . . . . ."
                : ""}
            </div>
            <div>
              {feturenews && feturenews[0].des.length > 300 ? (
                <NavLink to="/news" className="home-news-f-more ">
                  read more <i class="fa-solid fa-angle-right"></i>
                </NavLink>
              ) : (
                ""
              )}
            </div>
          </Col>

          <Col className="col-12 col-lg-4 col-md-5">
            <div className="home-news-type ">new updates</div>
            <div className="home-news-type-line"></div>

            {/* ////////////////////////////////////////////////////////////////// */}
            {getnews_state.data &&
              getnews_state.data.map((data, index, array) => {
                return (
                  <div className="home-up-news-container" data-aos="fade-left">
                    <div
                      className="home-up-image"
                      style={{ backgroundImage: `url("${data.photo}")` }}
                    ></div>
                    <div className="home-up-detail">
                      <div className="home-up-title">{data.title}</div>
                      <div className="home-up-para">
                        {data.des.slice(0, 280)}
                        {data.des.length > 280 ? ". . . . . . . more" : ""}
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* ////////////////////////////////////////////////////// */}
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
          {team_state.data &&
            team_state.data.map((data, index) => {
              return index < 5 ? (
                <div className="home-team-card " data-aos="zoom-out">
                  <div
                    className="home-team-card-img"
                    style={{ backgroundImage: `url(${data.photo})` }}
                  ></div>
                  <div className="home-team-card-detail d-flex align-items-center justify-content-center flex-column">
                    <div className="home-team-card-name">{data.position}</div>
                    <div className="home-team-card-post">{data.name}</div>
                  </div>
                </div>
              ) : (
                ""
              );
            })}
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
