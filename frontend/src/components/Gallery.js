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
import ImageLoading from './ImageLoading';
import GalleryPhoto from './GalleryPhoto';

const Gallery = () => {
  const[category_state,category_dispatch] =useReducer(postReducer,INITIAL_STATE)
  const[gallery_state,gallery_dispatch] =useReducer(postReducer,INITIAL_STATE)
  const [filter_category,set_filter_category] = useState({category:"all"})
  const [masonry,set_masonry] = useState()

  const[columnWrapper,set_columnWrapper] = useState({})
  const[page,set_page] = useState(1);
  const[gallery_data,set_gallery_data] = useState([])
  const [totalphoto,set_totalphoto] = useState(true);
  const [old_category,set_old_category] = useState('all');


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
        if(tablist.scrollLeft >= 10){
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


     // Get A team data 
     useEffect(()=>{
        const controller = new AbortController()
        const {signal} = controller;
        
        GetGallery()
        async function GetGallery(){
        
        gallery_dispatch({type:"FETCH_START"})
        try{
            const response = await axios.get(`/getmasonrygallery?category=${filter_category.category}&page=${page}`,{signal})
            // console.log(response)
            if(response.data.success){
                
                const all_data = response.data.data
    
                set_old_category(filter_category.category);
                if(old_category!==filter_category.category){
                    console.log('category change')
                    set_page(1);
                    set_gallery_data(all_data)
                    set_old_category(filter_category.category);
                }
                else{
            
                    set_gallery_data((prev)=>[...prev,...all_data])
                }
                // console.log(filter_category)
                // console.log(old_category);
                set_totalphoto(gallery_data.length+ 1 > response.data.total?false:true);
                gallery_dispatch({type:"FETCH_SUCCESS",payload:[gallery_state.success]})
            }
        }
        catch(err){
    
            // if(err.message!=="Network Error"){
            //     gallery_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message]})
                
            // }
        }
    }
        return()=>{controller.abort()}

    },[page,filter_category])
 


    useEffect(()=>{
        
        window.addEventListener("scroll",handleInfiniteScroll);
        GetTeam()
        return()=>window.removeEventListener("scroll",handleInfiniteScroll)
        
    },[]);

    console.log(gallery_data);
    

    

    const handleInfiniteScroll= ()=>{
        const{scrollTop,clientHeight,scrollHeight} = document.documentElement;
        if(scrollTop +clientHeight+0.9>=scrollHeight&&totalphoto){
            
            set_page((prev)=>prev+1);
            console.log("page increasing")
        }
    
    }
    console.log(page)



  function filterout(data,event,index){
        set_filter_category({category:data.category})

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
                            return(<li key={category._id}><a className={index==0?"active":""}onClick={(e)=>filterout({category},e,index)}>{category}</a></li>)

                          })
                          }
                        </ul>
                                
                        <div className="right-arrow active">
                        <i class="fa-solid fa-caret-right"></i>
                </div>
            </div>
        </div>

      
        <div className="user-gallery-main-container">
            <GalleryPhoto gallerydata={gallery_data}></GalleryPhoto> 
         
        </div>
       
      
      </div>
      {
        gallery_state.loading?
         <span class="loader"></span>:""

      }
      {/* <Footer /> */}
    </div>
  );
};

export default Gallery;

  