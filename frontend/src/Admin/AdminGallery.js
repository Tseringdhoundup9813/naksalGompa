import React,{useState,useReducer, useEffect, useRef} from 'react'
import AdminSideBar from './AdminSideBar'
import "../AdminStyle/admingallery.css"
import PhotoPreview from '../components/PhotoPreview'
import { INITIAL_STATE,postReducer } from '../Reducer/NewsReducer'
import axios from "../Services/Instance"


function AdminGallery() {

        const[category_state,category_dispatch] =useReducer(postReducer,INITIAL_STATE)
        const[gallery_state,gallery_dispatch] =useReducer(postReducer,INITIAL_STATE)

        

         const[preview,set_preview] = useState(false)
         const[gallery,set_gallery] = useState({file:"",category:""})
         const[category,set_category] = useState("")
         const[add,set_add] = useState('true')
         const [filter_category,set_filter_category] = useState({category:"all"})
         // get a  file from photopreview component
         function getfile(file){
            set_gallery({...gallery,file:file})
        }
      
        // //////////////////////////////////////////
        // /Cancle the current image preview////////////////
        function canclePreview(){
            set_preview(true)
            
            setTimeout(function(){
                set_preview(false)
            },0.4)
        }
        // ///////////////////////////////////////////
    



// Gallery---------------------------------------
// //////////////////////////////////////////////////////
async function SubmitGallery(event){
    event.preventDefault()
    
    
    const formdata =new FormData();

    formdata.append("category",gallery.category)
    formdata.append("photo",gallery.file)


   

    try{

        gallery_dispatch({type:"FETCH_START"})
        const response = await axios.post("/uploadgallery",formdata)
       
        if(response.data.success){
            // after successfully submit empty the input field and file field
            console.log("dont work")
            //  set_preview(true)
            //  ////////////////////////////////////////////
            const get_all_team = response.data.data
            console.log(get_all_team)
             
            gallery_dispatch({type:"FETCH_SUCCESS",payload:[true,get_all_team]})
            removeAllActiveClasses()
            const tabs = document.querySelectorAll(".category-scrollbar-tab-container a")
            tabs[0].classList.add('active')
            filterout({ category: 'all' })

            canclePreview()
            
            // setTimeout(function(){
            //  team_dispatch({type:"FETCH_SUCCESS",payload:false})
        
            // },1200)
        }

    }
    catch(err){
        console.log(err)
        console.log(err.message!=="Network Error")
        
        if(err.message!=="Network Error"){

            gallery_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield]})
           
        }
    }
}
// ////////////////////////////////////////////


// ////////////////////////////////////////




   async function SubmitCategory(event){
        event.preventDefault()
        
        
        const formdata =new FormData();

        formdata.append("category",category)
       

        try{

            category_dispatch({type:"FETCH_START"})
            const response = await axios.post("/uploadCategory",formdata)
           
            if(response.data.success){
                // after successfully submit empty the input field and file field
                console.log("dont work")
                //  set_preview(true)
                //  ////////////////////////////////////////////
                const get_all_team = response.data.data
                console.log(get_all_team)
                 
                category_dispatch({type:"FETCH_SUCCESS",payload:[true,get_all_team]})
                // set_team({file:"",position:"",name:""})
                canclePreview()
                
                // setTimeout(function(){
                //  team_dispatch({type:"FETCH_SUCCESS",payload:false})
            
                // },1200)
            }

        }
        catch(err){
            console.log(err)
            console.log(err.message!=="Network Error")
            
            if(err.message!=="Network Error"){
    
                category_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield]})
               
            }
        }
    }
    // ////////////////////////////////////////////
     // Get A team data 
     useEffect(()=>{
        async function GetTeam(){
            category_dispatch({type:"FETCH_START"})
            try{
                const response = await axios.get("/getcategory")
                // console.log(response)
                if(response.data.success){
                    
                    const all_data = response.data.data
                    
                    category_dispatch({type:"FETCH_SUCCESS",payload:[true,all_data]})
            
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

        // 
        GetTeam()
        // ////////////////////////////////////////


        console.log(filter_category)

        async function GetGallery(){
            gallery_dispatch({type:"FETCH_START"})
            try{
                const response = await axios.get(`/getgallery?category=${filter_category.category}`)
                // console.log(response)
                if(response.data.success){
                    
                    const all_data = response.data.data
                    
                    gallery_dispatch({type:"FETCH_SUCCESS",payload:[true,all_data]})
            
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
        console.log(tablist)
        manageIcons();
        console.log("right arrow");
    })
    
    leftarrow&&leftarrow.addEventListener("click",()=>{
        tablist.scrollLeft -= 200;
        console.log(tablist)
        manageIcons();
        console.log("right arrow");
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

    // delete photo
   async function DeletePhoto(id){
        gallery_dispatch({type:"FETCH_START"})
        try{
            const response = await axios.delete(`/deletegallery/${id}?category=${filter_category.category}`)
            // console.log(response)
            console.log(response.data)
            if(response.data.success){
                
                const delete_team = response.data.data
                console.log(delete_team)
                gallery_dispatch({type:"FETCH_SUCCESS",payload:[true,delete_team]})
               
        
            }
        }
        catch(err){
         
            if(err.message!=="Network Error"){
                gallery_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield]})
                
            }
        }
    }

    // 
    // filter out 

    function filterout(data){
        set_filter_category(data)
        console.log(data)
        GetGallery()
        
        async function GetGallery(){
            gallery_dispatch({type:"FETCH_START"})
            try{
                const response = await axios.get(`/getgallery?category=${data.category}`)
                // console.log(response)
                if(response.data.success){
                    
                    const all_data = response.data.data
                    
                    gallery_dispatch({type:"FETCH_SUCCESS",payload:[true,all_data]})
            
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
    <div className="admin-gallery-main-container">
        <AdminSideBar></AdminSideBar>



        <div className="admin-gallery-container">
            <div className="category-gallery-container-main">
                    <div className="category-scrollbar-tab-container">
                            <div className="left-arrow">
                            <i class="fa-solid fa-caret-left"></i>
                            </div>
                     
                                <ul>
                                
                                
                                    {
                                
                                    category_state.data&&category_state.data[0]&&category_state.data[0].category.map((category,index)=>{
                                        return(<li key={category._id}><a className={index==0?"active":""} onClick={()=>filterout({category})}>{category}</a></li>)

                                    })
                                    }
                                </ul>
                                
                           
                            
                            <div className="right-arrow active">
                            <i class="fa-solid fa-caret-right"></i>
                            </div>


                       
                    </div>
                    <div className="total-photo-count">
                            <p>{gallery_state.data&&gallery_state.data.length}</p>
                            <p>total picture</p>
                    </div>
                    <div className="photo-gallery-container">
                     
                        {
                            gallery_state.data&&gallery_state.data.map((photo)=>{
                                return<div>
                                    <img src={photo.photo} loading='lazy'></img>
                                        <i class="fa-solid fa-trash" onClick={()=>DeletePhoto(photo._id)}></i>
                                    </div>
                            })
                        }
                    
                    </div>
            </div>
            <div className="gallery-submit-container">
                {/* preview cancle button ============================================= */}
             
                {/* ////////////////////////////////////////////////////////////////////////////// */}
                <div className="add-category-add-photo-selection">
                    <select className='add-category-photo' onChange={(e)=>set_add(e.target.value)}>
                        <option value={true}>Add Photo</option>
                        <option value={false}>Add photo Category</option>
                    </select>
                </div>
               
                {
                  add=="true"? 
                        <div>
                            <div className="admin-team-preview-cancle" onClick={canclePreview}>
                                <i class="fa-solid fa-xmark"></i>
                            </div>
                       
                        <form onSubmit={SubmitGallery}>
                            <PhotoPreview width={"100%"} height={"40vh"} getfile={getfile}  preview_text={true}  setfile={preview} ></PhotoPreview>
                            <select value={gallery.category} onChange={(e)=>set_gallery({...gallery,category:e.target.value})}>
                                <option></option>
                            {
                                category_state.data&&category_state.data[0]&&category_state.data[0].category.map((category,index)=>{
                                    return(index>0?<option value={category}>{category}</option>:"")

                                })
                            }
                            </select>
                       
                            <button>Submit photo</button>
                        </form> 
                        </div> 
                    :
                        <form onSubmit={SubmitCategory}>
                            <input placeholder='add a new category' onChange={(e)=>set_category(e.target.value)}></input>
                            <button>Submit photo</button>
                        </form>   

                }
              
             
     
            </div>
        </div>

    </div>
  )
}

export default AdminGallery