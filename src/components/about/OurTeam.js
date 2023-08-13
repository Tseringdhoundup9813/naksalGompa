import React, { useState, useReducer, useEffect } from "react";

//navbar footer
import Navbar from "../navbar";
import Footer from "../Footer";

//css
import "../../style/OurTeam.css";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { INITIAL_STATE, postReducer } from "../../Reducer/NewsReducer";
import axios from "../../Services/Instance";

const OurTeam = () => {
  const [team_state, team_dispatch] = useReducer(postReducer, INITIAL_STATE);
  const [column, set_column] = useState([]);

  useEffect(() => {
    async function GetTeam() {
      team_dispatch({ type: "FETCH_START" });
      try {
        const response = await axios.get("/getteam");
        // console.log(response)
        if (response.data.success) {
          const all_data = response.data.data;
          team_dispatch({
            type: "FETCH_SUCCESS",
            payload: [true, CollectionOfTeam(all_data)],
          });
        }
      } catch (err) {
        // console.log(err)
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
  }, []);

  function CollectionOfTeam(team) {
    let add_column = [];
    const wrapper = [];
    for (var a = 0; a < (team.length - 1) / 4 + 1; a++) {
      wrapper[`collection${a}`] = [];
      if (a) {
        add_column[a] = [a];
      }
    }

    set_column(add_column);

    let column = 0;
    let totaldatatoadd = 0;

    team.forEach((data, index) => {
      wrapper[`collection${column}`].push(data);
      if (wrapper[`collection${column}`].length > totaldatatoadd) {
        column += 1;
        totaldatatoadd = 3;
      }
    });
    return wrapper;
  }

  console.log(column && column);
  // console.log(team_state.data&&team_state.data)
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
                {team_state.data["collection0"] &&
                  team_state.data["collection0"].map(data => {
                    return (
                      <div className="team-head">
                        <div
                          className="team-img"
                          data-aos="zoom-in"
                          style={{ backgroundImage: `url(${data.photo})` }}
                        ></div>
                        <div className="team-img-after"></div>
                        <div className="team-detail">
                          <div className="team-name">{data.position}</div>
                          <div className="team-post">{data.name}</div>
                        </div>
                      </div>
                    );
                  })}

                {column &&
                  column.map((data, index) => {
                    return (
                      <div className="team-up-container">
                        {team_state.data[`collection${data}`] &&
                          team_state.data[`collection${data}`].map(data => {
                            return (
                              <div className="team team-up" data-aos="zoom-in">
                                <div
                                  className="team-img"
                                  data-aos="zoom-in"
                                  style={{
                                    backgroundImage: `url(${data.photo})`,
                                  }}
                                ></div>
                                <div className="team-img-after"></div>
                                <div className="team-detail">
                                  <div className="team-name">{data.name}</div>
                                  <div className="team-post">
                                    {data.position}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
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
