import React,{useState,useReducer, useEffect, useRef} from 'react'
import AdminSideBar from './AdminSideBar'
import "../AdminStyle/admingallery.css"
import PhotoPreview from '../components/PhotoPreview'


function AdminGallery() {
         const[preview,set_preview] = useState(false)
         // get a  file from photopreview component
         function getfile(file){

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
    <div className="admin-gallery-main-container">
        <AdminSideBar></AdminSideBar>



        <div className="admin-gallery-container">
            <div className="gallery-show-container">

            </div>
            <div className="gallery-submit-container">
                {/* preview cancle button ============================================= */}
                <div className="admin-team-preview-cancle" onClick={canclePreview}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                {/* ////////////////////////////////////////////////////////////////////////////// */}
                <form>
                    <PhotoPreview width={"100%"} height={"40vh"} getfile={getfile}  preview_text={true}  setfile={preview} ></PhotoPreview>
                    <select>
                    <option>Home</option>
                    </select>
                    <input placeholder='add a new category'></input>
                    <button>Submit photo</button>
                </form>   
     
            </div>
        </div>

    </div>
  )
}

export default AdminGallery