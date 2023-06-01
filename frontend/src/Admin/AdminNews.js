import React,{useReducer, useState} from 'react'
import "../AdminStyle/adminnews.css"
import AdminSideBar from './AdminSideBar'
import PhotoPreview from '../components/PhotoPreview'
import { INITIAL_STATE,postReducer } from '../Reducer/NewsReducer'
import axios from "../Services/Instance"

import Loader from '../components/Loader'

function AdminNews() {


    // use reducer 
    const[state,dispatch] =useReducer(postReducer,INITIAL_STATE)


    // stat
    const[preview,set_preview] = useState(false)
    const[news_data,set_news_data] = useState({title:"",des:"",programdate:"",file:""})

    // //////////////////////////

   
    // get a  file from photopreview component
    function getfile(file){
        set_news_data({...news_data,file:file})
        if(file!==undefined){
            set_preview(false)
        }
    }
    // //////////////////////////////////////////
    // /Cancle the current image preview////////////////
    function canclePreview(){
        set_preview(true)
    }
   



    // /////////////////////////////////
    // data fecting and posting.////////////////////////


    console.log(state.success)
    async function SubmiNews(event){
        event.preventDefault()

        // 
        const formdata =new FormData();

        formdata.append("title",news_data.title)
        formdata.append("des",news_data.des)
        formdata.append("programdate",news_data.programdate)
        formdata.append("photo",news_data.file)

        try{

            dispatch({type:"FETCH_START"})
            const reponse = await axios.post("newsupload",formdata)
           
            if(reponse.data.success){

                const news_data = reponse.data.getnews
                dispatch({type:"FETCH_SUCCESS",payload:true})


                setTimeout(function(){
                 dispatch({type:"FETCH_SUCCESS",payload:false})

                },1200)
            }

        }
        catch(err){
          
            dispatch({type:"FETCH_ERROR"})
        }
    }




    // //////////////////////////////////////////////////
  return (
    <div className="admin-main-container">
        <AdminSideBar></AdminSideBar>
         
         
        <div className="news-main-container">
            
           
            <div className="news-show-container">
                <p>hello</p>
                 
                <p>{state.success}</p>
                
                {state.data&&state.data.map((data)=>{
                    return( <div>
                        <p>{data.tile}</p>
                        <p>{data.des}</p>

                        </div>)
                })}
            </div>
            <div className="news-upload-container">


                 {/* loading section ========================================== */}
                {
                state.loading?
                <div className='loading-container'><Loader></Loader></div>
                 
                
                :""
                }
            {/* ////////////////////////////////////////////////////////////// */}
            {/* successfull upload message ===================================== */}
            {
                state.success?
                <div className="sucessfullupload_message">
                  
                  <p> <i class="fa-regular fa-thumbs-up"></i>Sucessfully upload</p>
                 </div>
                 :""
            }   
            
            

            {/* ////////////////////////////////////////////////////////////// */}
        


                {/* preview cancle button ============================================= */}
                <div className="news-preview-cancle" onClick={canclePreview}>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                {/* ////////////////////////////////////////////////////////////////////////////// */}
                <form action="" onSubmit={SubmiNews}>
                    <PhotoPreview width={"85%"} height={"35vh"} getfile={getfile} setfile={preview}></PhotoPreview>
                    
                    <div className="news-title-date-container">

                            <div className="news-title">
                             
                                <input type="text" placeholder='please add title' onChange={(e)=>set_news_data({...news_data,title:e.target.value})}/>
                            </div>

                            <div className="news-date">
                              
                                <input type="date" placeholder='Date' onChange={(e)=>set_news_data({...news_data,programdate:e.target.value})} />
                            </div>
                          
                    </div>
                    <div className="new-des-container">
                               
                                <textarea type="textarea" placeholder='please add detail' onChange={(e)=>set_news_data({...news_data,des:e.target.value})} />
                    </div>
                   
                   <div className="news-submit-button">
                        <button>Submit News</button>
                   </div>
              
                </form>
      
            </div>
        </div>
    </div>
  )
}

export default AdminNews