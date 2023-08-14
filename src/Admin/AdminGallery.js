import React,{useState,useReducer, useEffect} from 'react'
import AdminSideBar from './AdminSideBar'
import "../AdminStyle/admingallery.css"
import PhotoPreview from '../components/PhotoPreview'
import { INITIAL_STATE,postReducer } from '../Reducer/NewsReducer'
import axios from "../Services/Instance"
import Loader from '../components/Loader'

function AdminGallery() {

        const[category_state,category_dispatch] =useReducer(postReducer,INITIAL_STATE)
        const[gallery_state,gallery_dispatch] =useReducer(postReducer,INITIAL_STATE)

        

         const[preview,set_preview] = useState(false)
         const[gallery,set_gallery] = useState({file:"",category:""})
         const[category,set_category] = useState("")
         const[add,set_add] = useState('true')
         const [filter_category,set_filter_category] = useState({category:"all"})

         const[edit_category,set_edit_category] = useState(false)
         const[editcontext,set_editcontext] = useState({x:"",y:"",category:"",index:"",totalphoto:0})
         const[category_replace,set_category_replace] = useState({old_category:"",replace_old_category:""})
         const[category_index,set_category_index] = useState();

        
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
            
            gallery_dispatch({type:"FETCH_SUCCESS",payload:[true,get_all_team]})
            removeAllActiveClasses()
            const tabs = document.querySelectorAll(".category-scrollbar-tab-container a")
            tabs[0].classList.add('active')
            filterout({ category: 'all' })

            canclePreview()
            // set category to empty after sucessfull upload
            set_gallery({gallery:"",category:""})

            setTimeout(function(){
             gallery_dispatch({type:"FETCH_SUCCESS",payload:[false,get_all_team]})
        
            },3200)
        }

    }
    catch(err){
        console.log(err)
        console.log(err.message!=="Network Error")
        
        if(err.message!=="Network Error"){
            gallery_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield,err.response.data.data]})
           
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
            
                const get_all_team = response.data.data
                console.log(get_all_team)
                 
                category_dispatch({type:"FETCH_SUCCESS",payload:[true,get_all_team]})
                set_category('');
                setTimeout(function(){
                 category_dispatch({type:"FETCH_SUCCESS",payload:[false,get_all_team]})
                
                },2000)
            }

        }
        catch(err){
         
            console.log(err.message!=="Network Error")
            
            if(err.message!=="Network Error"){
    
                category_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield,err.response.data.data]})
               
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

        // 
        GetTeam()
        // ////////////////////////////////////////



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
                gallery_dispatch({type:"FETCH_SUCCESS",payload:[false,delete_team]})
               
        
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

    function filterout(data,event){
        set_filter_category(data)
        // console.log(event.detail)
        GetGallery()
        
        async function GetGallery(){
            gallery_dispatch({type:"FETCH_START"})
            try{
                const response = await axios.get(`/getgallery?category=${data.category}`)
                // console.log(response)
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

   
    // delete a category or replace category
     function EditCategory(e,category,index,array){
       e.preventDefault();
            // get a total category
          
            async function GetGallery(){
                // gallery_dispatch({type:"FETCH_START"})
                try{
                    const response = await axios.get(`/getgallery?category=${category}`)
                    // console.log(response)
                    if(response.data.success){
                        

                        const all_data = response.data.data
                        set_category_index(index)
                   
                        set_edit_category(true)
                   

                        set_category_replace({...category_replace,old_category:category})
                        set_editcontext({x:e.pageX,y:e.pageY,category:category,index:index,totalphoto:all_data.length})
                    
                
                    }
                }
                catch(err){
                
                    // console.log(err)
                    if(err.message!=="Network Error"){
                        console.log(err)

                    }
                }
            }

            if(category!=="all"){
                GetGallery()
            }
            // 
         

     }

    //  close the edit context 

    // replace category-------------------------------------------------------------
    // ///////////////////////////////////////////////////////////////////////////
      async function ReplaceCategorySave(event){
         event.preventDefault();
            
        const formdata =new FormData();
        formdata.append("index",category_index)

        formdata.append("old_category",category_replace.old_category)
        formdata.append("new_category",category_replace.replace_old_category)
        try{

            category_dispatch({type:"FETCH_START"})
            const response = await axios.post("/replacecategory",formdata)
           
            if(response.data.success){
                // after successfully submit empty the input field and file field
                console.log("dont work")
                //  set_preview(true)
                //  ////////////////////////////////////////////
                const get_all_team = response.data.data
                console.log(get_all_team)
                set_edit_category(false)
                
                 
                category_dispatch({type:"FETCH_SUCCESS",payload:[true,get_all_team]})
               
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
    // //////////////////////////////////////////////////////////////////////////
    
    // delete category and photo 
    async function delete_category_photo(event,category){
        event.preventDefault()
        console.log(category)
        // const formdata =new FormData();
        // formdata.append("category",category_replace.old_category)
       
        try{

            category_dispatch({type:"FETCH_START"})
            const response = await axios.delete(`/deletecategory/${category}/${category_index}`)
           
            if(response.data.success){
                // after successfully submit empty the input field and file field
                console.log("dont work")
                //  set_preview(true)
                //  ////////////////////////////////////////////
                const get_all_team = response.data.data
                const get_gallery = response.data.photo;
                set_edit_category(false)
                
                
                gallery_dispatch({type:"FETCH_SUCCESS",payload:[false,get_gallery]})
                
                category_dispatch({type:"FETCH_SUCCESS",payload:[false,get_all_team]})
                
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
      




  return (
    <div className="admin-gallery-main-container">


    {/* category edit  */}
        {
            edit_category? 
             <div className="edit-category-container" style={{transform:`translate(${editcontext.x}px,${editcontext.y}px)`}}>
                <div className="edit-context-category">
                    <div className="editcontext-category-close">
                       <i class="fa-solid fa-xmark" onClick={()=>set_edit_category(false)}></i> 
                    </div>
                    <p>{editcontext.category}</p>
                    <p><span>{editcontext.totalphoto}</span> photo</p>
                    <div className="edit-context-replace-category-container">
                        <form onSubmit={ReplaceCategorySave}>
                            <input type="text" value={editcontext.category} />
                            <input type="text" onChange={(e)=>set_category_replace({...category_replace,replace_old_category:e.target.value})} placeholder='Replace' />
                            <button>Replace Save</button>
                        </form>
                       
                    </div>
                    <div className="editcontext-delete-including-photo">
                        <form onSubmit={(e)=>delete_category_photo(e,editcontext.category)}>
                             <button>Delete category with photo</button>
                        </form>
                    </div>
                  
                </div>
            </div>
            :""
        }
      
        <AdminSideBar></AdminSideBar>



        <div className="admin-gallery-container">
            <div className="category-gallery-container-main">

                    {
                         gallery_state.loading?<div className="gallery-main-loader"><Loader></Loader></div>:""
                    }


                    <div className="category-scrollbar-tab-container">
                            <div className="left-arrow">
                            <i class="fa-solid fa-caret-left"></i>
                            </div>
                                <ul>
                                    {
                                      category_state.loading?<li><a>...loading</a></li>:
                                    category_state.data&&category_state.data[0]&&category_state.data[0].category.map((category,index,array)=>{
                                        return(<li key={category._id}  onContextMenu={(e)=>EditCategory(e,category,index,array)}><a className={index==0?"active":""}onClick={(e)=>filterout({category},e)}   >{category}</a></li>)

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

                    <div className="add-category-photo-container">
                        <select className='add-category-photo' onChange={(e)=>set_add(e.target.value)}>
                            <option value={true}>Add Photo</option>
                            <option value={false}>Add Category</option>
                        </select>
                        <div className="category-photo-drop-down-icon">
                            <i class="fa-solid fa-caret-down"></i>
                        </div>
                    </div>
                    
                </div>
               
                {
                  add=="true"? 
                        <div>
                        {/* cancle preivew  */}
                        <div className="admin-gallery-preview-cancle" onClick={canclePreview}>
                           <i class="fa-solid fa-xmark"></i>
                        </div>
                        {/* /////////////////////////// */}

                       {/* /////////////////////////////////////////////////////////////////////// */}
                        <form onSubmit={SubmitGallery}>
                            {/* sucessfull added message  */}

                             {
                                gallery_state.success&&gallery_state.success?
                                <div className="category-submit-sucess-message">
                                    <p>Sucessfully added category</p>
                                </div>
                                :""
                            }
                            {/* //////////////////////////////////////////////////////////////////////// */}

                            <PhotoPreview width={"100%"} height={"40vh"} getfile={getfile}  preview_text={true}  setfile={preview}  required={gallery_state.empty_field&&gallery_state.empty_field.includes("file")?true:false}></PhotoPreview>
                            <select value={gallery.category} onChange={(e)=>set_gallery({...gallery,category:e.target.value})}  style={{border:`${gallery_state.empty_field&&gallery_state.empty_field.includes("category")?"2px solid red":""}`}}>
                                <option value="">Choose a category for photo</option>
                            {
                                category_state.data&&category_state.data[0]&&category_state.data[0].category.map((category,index)=>{
                                    return(index>0?<option value={category}>{category}</option>:"")

                                })
                            }
                            </select>
                            {/* error message----------------------------- */}
                            {
                             gallery_state.error&&gallery_state.error
                             ?
                              <div className="category-submit-message">
                              <p> {gallery_state.error_message&&gallery_state.error_message}</p>
                              </div>
                              :''
                            }
                            {/* ///////////////////////////////////////////////////// */}
                           
                            <button>Submit photo</button>
                        </form> 

                        {/* //////////////////////////////////////////////////////////////////////// */}
                        </div> 
                         :
                        <form onSubmit={SubmitCategory}>
                            {
                                category_state.success&&category_state.success?
                                <div className="category-submit-sucess-message">
                                    <p>Sucessfully added category</p>
                                </div>
                                :""
                            }
                            <input placeholder='add a new category' value ={category}onChange={(e)=>set_category(e.target.value)} style={{border:`${category_state.empty_field&&category_state.empty_field.includes("category")?"2px solid red":""}`}}></input>
                            {
                               category_state.error&&category_state.error
                               ?
                                <div className="category-submit-message">
                                <p> {category_state.error_message&&category_state.error_message}</p>
                                </div>
                                :''
                            }
                           
                            <button>Submit Category</button>
                        </form>   

                }
              
             
     
            </div>
        </div>

    </div>
  )
}

export default AdminGallery