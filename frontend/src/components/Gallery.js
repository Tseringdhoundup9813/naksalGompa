import React,{useState,useReducer, useEffect, useRef} from 'react'


//navbar footer
import Navbar from "./navbar";
import Footer from "./Footer";
import { INITIAL_STATE,postReducer } from '../Reducer/NewsReducer'
import axios from "../Services/Instance"
import Loader from '../components/Loader'


//css
import "../style/Gallery.css";
//bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";

const Gallery = () => {
  const[category_state,category_dispatch] =useReducer(postReducer,INITIAL_STATE)
  const[gallery_state,gallery_dispatch] =useReducer(postReducer,INITIAL_STATE)
  const [filter_category,set_filter_category] = useState({category:"all"})
  const [masonry,set_masonry] = useState()
  const[column,set_column] = useState([0,1,2,3])


       // ////////////////////////////////////////////


      
    // Horizontal scroll system/////------------------------------------
    const tabs = document.querySelectorAll(".category-scrollbar-tab-container a")
    const rightarrow = document.querySelector(".category-scrollbar-tab-container .right-arrow i")
    const leftarrow = document.querySelector(".category-scrollbar-tab-container .left-arrow i")

    const tablist = document.querySelector('.category-scrollbar-tab-container ul')

    const rightarrowContainer = document.querySelector(".category-scrollbar-tab-container .right-arrow")
    const leftarrowContainer = document.querySelector(".category-scrollbar-tab-container .left-arrow")

    const removeAllActiveClasses = ()=>{
        tabs.forEach((tab)=>{
            tab.classList.remove("active")
        })
    }
    tabs.forEach((tab)=>{
        tab.addEventListener("click",function(event){
            removeAllActiveClasses()
            tab.classList.add("active");
        })
    })
    const manageIcons = ()=>{
        if(tablist.scrollLeft >= 20){
            leftarrowContainer.classList.add("active");
        }
        else{
            leftarrowContainer.classList.remove("active");
        }
        let maxScrollValue= tablist.scrollWidth - tablist.clientWidth - 20;
        if(tablist.scrollLeft >=maxScrollValue){
            rightarrowContainer.classList.remove("active")
        }
        else{
            rightarrowContainer.classList.add('active');
        }

    }

    rightarrow&&rightarrow.addEventListener("click",()=>{
        tablist.scrollLeft += 200;

        manageIcons();
     
    })
    
    leftarrow&&leftarrow.addEventListener("click",()=>{
        tablist.scrollLeft -= 200;
      
        manageIcons();
        
    })
    tablist&& tablist.addEventListener("scroll",manageIcons)
    let dragging = false;
    tablist&&tablist.addEventListener("mousedown",()=>{
        dragging = true;
    })
    tablist&&tablist.addEventListener('mousemove',(e)=>{
        if(!dragging) return;
        tablist.classList.add("dragging")
        tablist.scrollLeft -=e.movementX;
    })
    document.addEventListener("mouseup",()=>{
        dragging = false;
        tablist&&tablist.classList.remove("dragging")
        // tablist!==null?tablist.classList.remove("dragging"):""
        
    })
    // /////////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////







     // Get A team data 
     useEffect(()=>{

        







      async function GetTeam(){
          category_dispatch({type:"FETCH_START"})
          try{
              const response = await axios.get("/getcategory")
              // console.log(response)
              if(response.data.success){
                  
                  const all_data = response.data.data
                  
                  category_dispatch({type:"FETCH_SUCCESS",payload:[false,all_data]})
          
              }
          }
          catch(err){
            
              console.log(err)
              if(err.message!=="Network Error"){
                  category_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield]})
                  console.log(err.response.data.emptyfield)
              }
          }
      }
      GetTeam()

      async function GetGallery(){
        gallery_dispatch({type:"FETCH_START"})
        try{
            const response = await axios.get(`/getgallery?category=${filter_category.category}`)
            // console.log(response)
            if(response.data.success){
                
                const all_data = response.data.data
                gallery_dispatch({type:"FETCH_SUCCESS",payload:[gallery_state.success,all_data]})
               
        
            }
        }
        catch(err){
          
            // console.log(err)
            if(err.message!=="Network Error"){
                gallery_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message]})
                console.log(err.response.data.emptyfield)
            }
        }
    }

    // 
    GetGallery()

    },[])





   function filterout(data,event){
    // set_filter_category(data)
    // console.log(event.detail)
   

    GetGallery()
      
      async function GetGallery(){
          gallery_dispatch({type:"FETCH_START"})
          try{
              const response = await axios.get(`/getgallery?category=${data.category}`)

              if(response.data.success){
                  
                  const all_data = response.data.data
                  gallery_dispatch({type:"FETCH_SUCCESS",payload:[false,all_data]})
                
          
              }
          }
          catch(err){
            
              // console.log(err)
              if(err.message!=="Network Error"){
                  gallery_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message]})
                  console.log(err.response.data.emptyfield)
              }
          }
      }


  }

  





  return (
    <div>
      <Navbar />
      <div id="gallery">
        <div className="gallery-category-container">
        <div className="category-scrollbar-tab-container">
            <div className="left-arrow">
                <i class="fa-solid fa-caret-left"></i>
                   </div>
                      <ul>
                         {
                            category_state.loading?<li><a>...loading</a></li>:
                            category_state.data&&category_state.data[0]&&category_state.data[0].category.map((category,index,array)=>{
                            return(<li key={category._id}><a className={index==0?"active":""}onClick={(e)=>filterout({category},e)}   >{category}</a></li>)

                          })
                          }
                        </ul>
                                
                        <div className="right-arrow active">
                        <i class="fa-solid fa-caret-right"></i>
                </div>
            </div>
        </div>
        <div className="user-gallery-main-container">
            {
                gallery_state.data&&gallery_state.data.map((data)=>{
                   return  <img src={data.photo} alt="" />
                })
            }
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Gallery;
