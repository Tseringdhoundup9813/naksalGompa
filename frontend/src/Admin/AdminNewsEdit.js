import React,{useState,useEffect,useReducer} from 'react'
import "../AdminStyle/NewsEditor.css"
import PhotoPreview from '../components/PhotoPreview'
import axios from '../Services/Instance'
import { INITIAL_STATE,postReducer } from '../Reducer/NewsReducer'

function AdminNewsEdit(props) {
    const[getnews_state,getnews_dispatch] = useReducer(postReducer,INITIAL_STATE)
    const[preview,set_preview] = useState(false)

    // close edit//////
    function closeEdit(){
        props.closeEdit(false)
    }
    // ////////////////////////


      // get a  file from photopreview component
      function getfile(file){
        // set_news_data({...news_data,file:file})
        if(file!==undefined){
            set_preview(false)
        }
    }
    // //////////////////////////////////////////
    // /Cancle the current image preview////////////////
    function canclePreview(){
        set_preview(true)
    }
    // ///////////////////////////////////////////


    // Get news////////////////////////////////////////////////////////////////
    useEffect(()=>{
     
        async function GetNews(){
            getnews_dispatch({type:"FETCH_START"})
            try{
                const response = await axios.get(`getnew/${props.set_news_id}`)
                console.log(response)
                // console.log(response)
                if(response.data.success){
                    
                    console.log(response.data.data)
                    const all_news_data = response.data.data
                    getnews_dispatch({type:"FETCH_SUCCESS",payloadnews:all_news_data})
            
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

        GetNews()
    },[])
        // 










  return (

   
    <div className="editor-news-background-container">

    <div className="news-editor-main-container">
        

        {/* edit-news-img-title-date-container */}


       
            <div className="close-news-editor">
                <i class="fa-solid fa-square-xmark" onClick={closeEdit}></i>
            </div>
                <form action="">
                    <div className="photo-title-date-section">
                        <div className="edit-news-title">
                            Edit news
                            {/* <p>{props.set_news_id}</p> */}
                        </div>
                        <PhotoPreview width={"90%"} height={"40vh"} getfile={getfile} setfile={preview}  set_img_src={getnews_state.data.photo}></PhotoPreview>
                        <div className="edit-news-input-title-date-container">
                            <input type="text"  defaultValue={getnews_state.data.title}/>
                            <input type="date" defaultValue={getnews_state.data.programdate} />
                            <button>Edit Submit</button>
                        </div>
                        
                    </div>
                    <div className="description-section">
                        <textarea name="" id="" cols="30" rows="10" defaultValue={getnews_state.data.des}></textarea>
                    </div>
                
                </form>
             </div>
        </div>
   
  )
  
}

export default AdminNewsEdit