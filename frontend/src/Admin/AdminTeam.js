import React,{useState,useReducer, useEffect} from 'react'
import "../AdminStyle/adminteam.css"
import AdminSideBar from './AdminSideBar'


import { INITIAL_STATE,postReducer } from '../Reducer/NewsReducer'
import PhotoPreview from '../components/PhotoPreview'
import axios from "../Services/Instance"
import { previousDay } from 'date-fns'
import Loader from '../components/Loader'



function AdminTeam() {


    const[preview,set_preview] = useState(false)
    const[team,set_team] = useState({file:"",position:"",name:""})
 
    const[team_state,team_dispatch] =useReducer(postReducer,INITIAL_STATE)
    const[edit_id,set_edit_id] = useState();


    
    
      // get a  file from photopreview component
      function getfile(file){
       
        set_team({...team,file:file})
    
      
    }
    // //////////////////////////////////////////
    // /Cancle the current image preview////////////////
    function canclePreview(){
        set_preview(true)
    }
    // ///////////////////////////////////////////
    function EditNews(id){
        set_edit_id(id)
        console.log("edit")
    }
    function closeEdit(){
        set_edit_id()
    }
    // /////////////////////////////////////////


//    detele a team 
      async function DeleteNews(id){
        console.log("Working")
        team_dispatch({type:"FETCH_START"})
        try{
            const response = await axios.delete(`/deleteteam/${id}`)
            // console.log(response)
            console.log(response.data)
            if(response.data.success){
                
                const delete_team = response.data.data
                console.log(delete_team)
                team_dispatch({type:"FETCH_SUCCESS",payload:[true,delete_team]})
               
        
            }
        }
        catch(err){
         
            if(err.message!=="Network Error"){
                team_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield,team_state.data]})
                
            }
        }
    }


     // /////////////////////////////////
    // data fecting and posting.////////////////////////
    async function SubmitTeam(event){
        event.preventDefault()

        // 
        const formdata =new FormData();

        formdata.append("position",team.position)
        formdata.append("name",team.name)
        formdata.append("photo",team.file)

        try{

            team_dispatch({type:"FETCH_START"})
            const response = await axios.post("/uploadteam",formdata)
           
            if(response.data.success){
                // after successfully submit empty the input field and file field
                console.log("dont work")
                //  set_preview(true)
                //  ////////////////////////////////////////////
                const get_all_team = response.data.get_all_team
                 
                team_dispatch({type:"UPDATE_DATA",payload:get_all_team})
            
                
                // setTimeout(function(){
                //  team_dispatch({type:"FETCH_SUCCESS",payload:false})
            
                // },1200)
            }

        }
        catch(err){
            console.log(err)
            console.log(err.message!=="Network Error")
            
            if(err.message!=="Network Error"){
                team_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield,team_state.data]})
               
            }
        }
    }

    // Get A team data 
    useEffect(()=>{
        async function GetTeam(){
            team_dispatch({type:"FETCH_START"})
            try{
                const response = await axios.get("/getteam")
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
    // console.log(team_state)
    // /////////////////










  return (
    <div className='adminteam-main-container'>
        
        <AdminSideBar></AdminSideBar>
        
        <div className="admin-team-second-container">
            <div className="admin-team-detail-container">
                {/* {
                    team_state.Loading?"":<div className='team-loading-container'><Loader></Loader></div>
                } */}
                
                {

                    team_state.loading?<div className='team-loading-container'><Loader></Loader></div>:
                    team_state.data&&team_state.data.map((data)=>{
                        return (
                            <div className="admin-team-box">
                                  {/* delete news */}
                                  {
                                    edit_id!==data._id?
                                    <div className="delete-edit_team">
                                        <i class="fa-solid fa-pen-to-square" onClick={()=>EditNews(data._id)}></i> 
                                        <i class="fa-solid fa-trash" onClick={()=>DeleteNews(data._id)}></i>
                                    </div>:
                                    <div className='team_edit_save_cancle_container'>
                                        <i class="fa-solid fa-file-arrow-up"></i>
                                        <i class="fa-regular fa-rectangle-xmark" onClick={closeEdit}></i>
                                    </div>
                                  }
                                
                                 {/* delte news */}

                                {edit_id!==data._id?<img src={data.photo} alt="" />:
                                <PhotoPreview   width={"100%"} height={"20vh"} getfile={getfile}  required={team_state.empty_field&&team_state.empty_field.includes("file")?true:false} preview_text={true}  set_img_src={data.photo}></PhotoPreview>}
                                <div className="admin-team-title">{edit_id!==data._id?<p>{data.position}</p>:<input type="text" defaultValue={data.position}></input>}</div>
                                <div className="admin-team-name">{edit_id!==data._id?<p>{data.name}</p>:<input type="text" defaultValue={data.name}></input>}</div>
                            </div>
                        )
                    })
                }
              
            </div>
            <div className="admin-team-form-container">
                {/* preview cancle button ============================================= */}
                <div className="admin-team-preview-cancle" onClick={canclePreview}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                {/* ////////////////////////////////////////////////////////////////////////////// */}
                <form action="" onSubmit={SubmitTeam}>
                    <PhotoPreview width={"85%"} height={"40vh"} getfile={getfile}  setfile={preview} required={team_state.empty_field&&team_state.empty_field.includes("file")?true:false}></PhotoPreview>
                    <div className="admin-team-input-container">
                        <input type="text"  onChange={(e)=>set_team({...team,position:e.target.value})} placeholder='provide title' style={{border:`${team_state.empty_field&&team_state.empty_field.includes("position")?"2px solid red":""}`}}/>
                        <input type="text"  onChange={(e)=>set_team({...team,name:e.target.value})}  placeholder='provide name' style={{border:`${team_state.empty_field&&team_state.empty_field.includes("name")?"2px solid red":""}`}}/>
                        <button>Submit</button>
                    </div>
                   
                </form>
            </div>
        </div>

        
    </div>
  )
}

export default AdminTeam