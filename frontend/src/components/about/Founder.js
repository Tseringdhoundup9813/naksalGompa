import React, { useState, useEffect ,useReducer} from "react";

import axios from "../../Services/Instance";
import { INITIAL_STATE,postReducer } from '../../Reducer/NewsReducer'
//navbar footer
import Navbar from "../navbar";
import Footer from "../Footer";

//css
import "../../style/Founder.css";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import parse from 'html-react-parser';


const Founder = () => {

  const[founder_state,founder_dispatch] =useReducer(postReducer,INITIAL_STATE)

   // /////////////////////////////////////////
          // Get A team data 
          useEffect(()=>{
            async function GetTeam(){
                founder_dispatch({type:"FETCH_START"})
                try{
                    const response = await axios.get("/getfounder")
                    // console.log(response)
                    if(response.data.success){
                        
                        const all_data = response.data.data
                        console.log(all_data)
                        founder_dispatch({type:"FETCH_SUCCESS",payload:[true,all_data]})
                
                    }
                }
                catch(err){
                  
                    console.log(err)
                    if(err.message!=="Network Error"){
                        founder_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield]})
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
      <div id="founder">
        <Container fluid className="founder-container">
          <Row>
            <Col className="col-12 col-sm-8 mx-auto text-uppercase">
              {/* <div className="founder-title">founder</div> */}
            </Col>
          </Row>
          <Row className="my-4">
            <Col className="col-12 col-md-5 col-lg-4">
              <div className="founder-card-container">
                <div className="f-box-left"></div>
                <div className="f-box-img"></div>
                <div className="f-box-right"></div>
              </div>
              <div className="founder-detail">
                <div className="founder-name">{founder_state.data[0] && founder_state.data[0].name}</div>
                <div className="founder-post">Rinpoche</div>
              </div>
            </Col>
            <Col className="col-12 col-md-7 col-lg-8">
              <div className="founder-main-detail">
                <div className="f-name text-capitalize">
                {founder_state.data[0] && founder_state.data[0].name}
                </div>
                <div className="f-para">
                 {founder_state.data[0]?parse(founder_state.data[0].des):""}
                </div>
                <div className="f-icon">
                  <div className="f-line"></div>
                  <div className="f-fb">
                    <i className="fa-brands fa-square-facebook"></i>
                  </div>
                  <div className="f-insta">
                    <i class="fa-brands fa-instagram"></i>
                  </div>
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

export default Founder;
