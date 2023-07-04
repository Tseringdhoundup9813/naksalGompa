
import React,{useEffect, useReducer, useState} from 'react'

//navbar footer
import Navbar from "./navbar";
import Footer from "./Footer";

//css
import "../style/News.css";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { INITIAL_STATE,postReducer } from '../Reducer/NewsReducer'
import axios from "../Services/Instance"

const News = () => {

  const[getnews_state,getnews_dispatch] = useReducer(postReducer,INITIAL_STATE)

  useEffect(()=>{
     
    async function GetNews(){
        getnews_dispatch({type:"FETCH_START"})
        try{
            const response = await axios.get("/getnews/")
            // console.log(response)
            if(response.data.success){
                
                const all_news_data = response.data.data
                getnews_dispatch({type:"FETCH_SUCCESS",payload:[true,all_news_data]})
        
            }
        }
        catch(err){
          
            console.log(err)
            if(err.message!=="Network Error"){
                getnews_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield]})
                console.log(err.response.data.emptyfield)
            }
        }
    }

    // 
    GetNews()
},[])


  return (
    <div>
      <Navbar></Navbar>
      <Container fluid className="p-0" id="news">
        <Row className="news-banner-row">
          <div className="news-head">news</div>
          <div className="news-detail">
            <div className="news-title">introduction</div>
            <p className="news-para">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum,
              odio quibusdam, nihil animi hic in dolor accusantium laudantium
              minus repellat consequatur obcaecati beatae saepe atque placeat
              laborum. Minima, repellat cupiditate ab magni, soluta nam facilis
              nihil, qui pariatur temporibus similique accusantium rem obcaecati
              at eaque impedit consequuntur tempore molestiae? Debitis
              consequatur, expedita vel exercitationem facere quos fugit facilis
              repudiandae perspiciatis!
            </p>
          </div>
        </Row>
        <Row className="news-second-container p-0 m-0">
          <div className="ns-card-container">
         
       
            {
              getnews_state.data&&getnews_state.data.map((item)=>{
                return(
                  <div className="newsimg-container">
                  <div className="news-img" style={{backgroundImage:`url(${item.photo})`}}></div>
                  <div className="ns-detail">
                    <div className="ns-para">
                    {item.des}
                    </div>
                    <div className="d-flex sm-margin align-items-center justify-content-between">
                      <div className="ns-more ">read more</div>
                      <div className="ns-icon">
                        <div className="ns-fb">
                          <i className="fa-brands fa-square-facebook"></i>
                        </div>
                        <div className="ns-insta">
                          <i class="fa-brands fa-instagram"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )
              })
            }
         


          </div>
        </Row>
        {/* <div className="news-third">
          <div className="banner-two"></div>
          <div className="ns-third-detail">
            <div className="banner-two-para">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              fugit veniam harum quod ex ut corrupti, cupiditate nesciunt nemo
              quam consequuntur, unde minima voluptas ipsum aspernatur?
              Explicabo quia magnam omnis!
            </div>
            <span className="ns-more">Read more</span>
          </div>
        </div> */}
/
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default News;
