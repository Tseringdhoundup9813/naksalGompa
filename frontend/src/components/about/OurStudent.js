import React, { useState, useEffect ,useReducer} from "react";
//navbar footer
import Navbar from "../navbar";
import Footer from "../Footer";
import axios from "../../Services/Instance";
import { INITIAL_STATE,postReducer } from '../../Reducer/NewsReducer'
//css
import "../../style/OurStudent.css";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const OurStudent = () => {

  const[team_state,team_dispatch] =useReducer(postReducer,INITIAL_STATE)

  useEffect(()=>{

     // ///////////////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////////////////

    async function GetTeam(){
      team_dispatch({type:"FETCH_START"})
      try{
          const response = await axios.get("/getStudent")
          // console.log(response)
          if(response.data.success){
              
              const all_data = response.data.data
              team_dispatch({type:"FETCH_SUCCESS",payload:[true,all_data]})
      
          }
      }
      catch(err){
        
          console.log(err)
          if(err.message!=="Network Error"){
              team_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield]})
              console.log(err.response.data.emptyfield)
          }
      }
  }

  // 
  GetTeam()

  },[])


  return (
    <div>
      <Navbar></Navbar>
      <div id="team">
        <Container className="team-container" fluid>
          <Row className="mb-5 d-flex align-items-center justify-content-center">
            <Col className="col-md-5 col-4 home-meet-leftarrow"></Col>
            <Col className="col-md-2 col-3 home-meet-title text-uppercase ">
              our Student
            </Col>
            <Col className="col-md-5 col-4 home-meet-rightarrow"></Col>
          </Row>
          <Row>
            <Col>
              <div className="student-grid-container">
                {
                  team_state.data&&team_state.data.map((data)=>{
                      return(
                        <div className="student-card">
                            <div className="student-img" style={{backgroundImage:`url(${data.photo})`}}></div>
                            <div className="student-detail">
                            <div className="student-post">{data.position}</div>
                            <div className="student-name">{data.name}</div>
                            <div className="student-name">{data.age}</div>

                           
                          </div>
                      </div>
                      )
                  })
                }
              
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default OurStudent;
