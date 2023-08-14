import React,{useState,useReducer, useEffect, useRef} from 'react'

import AdminSideBar from './AdminSideBar'
import "../AdminStyle/admindirector.css"
import PhotoPreview from '../components/PhotoPreview'
import { INITIAL_STATE,postReducer } from '../Reducer/NewsReducer'
import axios from "../Services/Instance"

import JoditEditor, {  } from "jodit-react"
import parse from 'html-react-parser';


function AdminFounder() {
    const editor = useRef(null)

    const[preview,set_preview] = useState(false)
    
    const[director_state,director_dispatch] =useReducer(postReducer,INITIAL_STATE)
    const[edit,set_edit] = useState(false)

    const [director,set_director] = useState({file:'',name:'',des:''})
    const[edit_director,set_edit_director] = useState({file:'',name:'',des:''})
    
    
      // get a  file from photopreview component
      function getfile(file){
       
        set_director({...director,file:file})
        set_edit_director({...edit_director,file:file})
    
      
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






    console.log(director_state)
    // SUBMIT DIRECTOR ..........................
        async function SubmitDirector(event){
            event.preventDefault()

        
            const formdata =new FormData();
    
            formdata.append("name",director.name)
            formdata.append("des",director.des)
            formdata.append("photo",director.file)
    
            try{
    
                director_dispatch({type:"FETCH_START"})
                const response = await axios.post("/uploadfounder",formdata)
               
                if(response.data.success){
                    // after successfully submit empty the input field and file field
                    console.log("dont work")
                    //  set_preview(true)
                    //  ////////////////////////////////////////////
                    const get_all_team = response.data.data
                    
                     set_director({file:'',name:'',des:''})
                    director_dispatch({type:"FETCH_SUCCESS",payload:[true,get_all_team]})
                   
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
                    director_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield,director_state.data]})
                   
                }
            }
            



        }
    // /////////////////////////////////////////
          // Get A team data 
    useEffect(()=>{
        async function GetTeam(){
            director_dispatch({type:"FETCH_START"})
            try{
                const response = await axios.get("/getfounder")
                // console.log(response)
                if(response.data.success){
                    
                    const all_data = response.data.data
                    console.log(all_data)
                    director_dispatch({type:"FETCH_SUCCESS",payload:[true,all_data]})
            
                }
            }
            catch(err){
              
                console.log(err)
                if(err.message!=="Network Error"){
                    director_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield]})
                    console.log(err.response.data.emptyfield)
                }
            }
        }

        // 
        GetTeam()


    },[])

    console.log(edit_director)

    function EditNews(name,des){
        set_edit(true)
        set_edit_director({...edit_director,name:name,des:des})
    }
    async function EditSave(id){
          
        const formdata =new FormData();
        formdata.append("name",edit_director.name)
        formdata.append("des",edit_director.des)
        formdata.append("photo",edit_director.file)


    director_dispatch({type:"FETCH_START"})
    try{
        const response = await axios.patch(`/editfounder/${id}`,formdata)
        console.log(response)
      
        if(response.data.success){
        
            const all_news_data = response.data.data
            director_dispatch({type:"FETCH_SUCCESS",payload:[true,all_news_data]})
            closeEdit()
        }
    }
    catch(err){
      
        // console.log(err)
        console.log(err.response)
        if(err.response!==undefined){
            if(err.message!=="Network Error"){
          
                 director_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message]})
                        
            }
        }
       
    }



    }
    function closeEdit(){
        set_edit(false)
    }
        
//    detele a team 
      async function DeleteDirector(id){
        console.log("Working")
        director_dispatch({type:"FETCH_START"})
        try{
            const response = await axios.delete(`/deletefounder/${id}`)
            // console.log(response)
            console.log(response.data)
            if(response.data.success){
                
                const delete_team = response.data.data
                console.log(delete_team)
                director_dispatch({type:"FETCH_SUCCESS",payload:[true,delete_team]})
               
        
            }
        }
        catch(err){
         
            if(err.message!=="Network Error"){
                director_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield,director_state.data]})
                
            }
        }
    }


     // /////////////////////////////////







console.log(director)


  return (
    <div className="admin-director-main-container">
        <AdminSideBar></AdminSideBar>
        <div className="admin-director-container">
            <div className="admin-director-section-1">
                {
                    director_state.data&&director_state.data.map((data)=>{
                        return(
                            <div className="admin-director-content">
                                  {/* delete news */}
                                  {
                                    edit?  
                                    <div className='director-delete-edit_team '>
                                        <i class="fa-solid fa-file-arrow-up" onClick={()=>EditSave(data._id)}></i>
                                        <i class="fa-regular fa-rectangle-xmark" onClick={closeEdit}></i>
                                    </div>:
                                    <div className="director-save-cancle-team ">
                                        <i class="fa-solid fa-pen-to-square" onClick={()=>EditNews(data.name,data.des)}></i> 
                                        <i class="fa-solid fa-trash" onClick={()=>DeleteDirector(data._id)}></i>
                           
                                    </div>
                                    
                                  }
                                
                                 {/* delte news */}
                                <div className="admin-edit-directory">
                                {edit? <PhotoPreview  preview_text={true}width={"100%"} height={"30vh"} getfile={getfile}  setfile={preview} required={director_state.empty_field&&director_state.empty_field.includes("file")?true:false}></PhotoPreview>: <img src={data.photo} alt="" />}
                                </div>
                              
                               {edit?<input defaultValue={data.name} onChange={(e)=>set_edit_director({...edit_director,name:e.target.value})}></input>:<h3>{data.name}</h3>}
                               {edit?  <JoditEditor  className="jodit-editor"ref={editor} value={data.des} onBlur={newContent=>{set_edit_director({...edit_director,des:newContent})}}></JoditEditor>:<div className='founder-bio'>{parse(data.des)}</div>}
                            </div>
                            
                        )
                    })
                }
              
              
            </div>
            <div className="admin-director-section-2">
                 {/* preview cancle button ============================================= */}
                 <div className="admin-team-preview-cancle" onClick={canclePreview}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                {/* ////////////////////////////////////////////////////////////////////////////// */}
                <form action="" onSubmit={SubmitDirector}>
                    
                    <PhotoPreview width={"95%"} height={"30vh"} getfile={getfile}  setfile={preview} required={director_state.empty_field&&director_state.empty_field.includes("file")?true:false}></PhotoPreview>
                    <input type="text" placeholder='name' value={director.name} onChange={(e)=>set_director({...director,name:e.target.value})} />
                  
                    <JoditEditor  className="jodit-editor"ref={editor} value={director.des} onBlur={newContent=>{set_director({...director,des:newContent})}}></JoditEditor>
                   
                   
                    <button className='submit-founder'>Submit Director</button>

                </form>
            </div>
        </div>

    </div>
  )
  
}

export default AdminFounder