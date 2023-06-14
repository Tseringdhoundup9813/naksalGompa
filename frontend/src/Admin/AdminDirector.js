import React,{useState,useReducer, useEffect} from 'react'

import AdminSideBar from './AdminSideBar'
import "../AdminStyle/admindirector.css"
import PhotoPreview from '../components/PhotoPreview'
import { INITIAL_STATE,postReducer } from '../Reducer/NewsReducer'
import axios from "../Services/Instance"




function AdminDirector() {


    const[preview,set_preview] = useState(false)
    
    const[team_state,team_dispatch] =useReducer(postReducer,INITIAL_STATE)
    

    
    
      // get a  file from photopreview component
      function getfile(file){
       
        // set_team({...team,file:file})
        // set_edit_team({...edit_team,file:file})
    
      
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
  return (
    <div className="admin-director-main-container">
        <AdminSideBar></AdminSideBar>
        <div className="admin-director-container">
            <div className="admin-director-section-1">
                <h1>Hello</h1>
            </div>
            <div className="admin-director-section-2">
                 {/* preview cancle button ============================================= */}
                 <div className="admin-team-preview-cancle" onClick={canclePreview}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                {/* ////////////////////////////////////////////////////////////////////////////// */}
                <form action="">
                    <PhotoPreview width={"50%"} height={"30vh"} getfile={getfile}  setfile={preview} required={team_state.empty_field&&team_state.empty_field.includes("file")?true:false}></PhotoPreview>
                    <input type="text" placeholder='name' />
                    <textarea name="" id="" cols="30" rows="10"></textarea>

                </form>
            </div>
        </div>

    </div>
  )
}

export default AdminDirector