import React,{useEffect, useReducer, useState} from 'react'
import "../AdminStyle/adminnews.css"
import AdminSideBar from './AdminSideBar'
import PhotoPreview from '../components/PhotoPreview'
import { INITIAL_STATE,postReducer } from '../Reducer/NewsReducer'
import axios from "../Services/Instance"

import Loader from '../components/Loader'

import AdminNewsEdit from './AdminNewsEdit'

// 
import formatDistanceToNow from "date-fns/formatDistanceToNow"

function AdminNews() {

    
    // use reducer upload news
    const[state,dispatch] =useReducer(postReducer,INITIAL_STATE)
    // ////////////////////////////////////////////////////////
    // get news reducer
    const[getnews_state,getnews_dispatch] = useReducer(postReducer,INITIAL_STATE)
    // stat
    // delete reducer//////////////////////////////////////////////////////////////
    const[deletenews_state,deletenews_dispatch] = useReducer(postReducer,INITIAL_STATE)

    const[news_id,set_news_id] = useState()




    // //////////////////////////////////////////////
    const[preview,set_preview] = useState(false)
    const[news_data,set_news_data] = useState({title:"",des:"",programdate:"",file:""})
    const[allnewsdata,setallnewsdata] = useState()
    const[editnewsopen,set_edit_news_open] = useState()
    console.log(news_data)

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
                // after successfully submit empty the input field and file field
                 set_news_data({title:"",des:"",programdate:"",file:""})
                 set_preview(true)
                //  ////////////////////////////////////////////
                const news_data = reponse.data.getnews
                dispatch({type:"FETCH_SUCCESS",payload:true})
                setallnewsdata(news_data)
        
                setTimeout(function(){
                 dispatch({type:"FETCH_SUCCESS",payload:false})
                

                },1200)
            }

        }
        catch(err){
            console.log(err)
            console.log(err.message!=="Network Error")
            
            if(err.message!=="Network Error"){
                dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield]})
                console.log(err.response.data.emptyfield)
            }
        }
    }


    // Get news////////////////////////////////////////////////////////////////
    useEffect(()=>{
     
        async function GetNews(){
            getnews_dispatch({type:"FETCH_START"})
            try{
                const response = await axios.get("/getnews/")
                // console.log(response)
                if(response.data.success){
                    
                    const all_news_data = response.data.data
                    getnews_dispatch({type:"FETCH_SUCCESS",payload:[true,all_news_data]})
            
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

        // 
        GetNews()
    },[allnewsdata])


    // //////////////////////////////////////////////////////////////////////
    // Delete news/////////////////////////////////////////////////////////////
    async function DeleteNews(id){
        console.log("Working")
        deletenews_dispatch({type:"FETCH_START"})
        try{
            const response = await axios.delete(`/deletenews/${id}`)
            // console.log(response)
            console.log(response.data)
            if(response.data.success){
                
                const delete_news = response.data.data
                console.log(delete_news)

                // deletenews_dispatch({type:"FETCH_SUCCESS"})
                getnews_dispatch({type:"DELETE_SUCCESS",payload:delete_news})
        
            }
        }
        catch(err){
         
            if(err.message!=="Network Error"){
                deletenews_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message,err.response.data.emptyfield]})
                
            }
        }
    }

    // ////////////////////////////////////////////////////////////////////////


    ///////////////////////////////
    // Open Editor news 
    function EditNews(id){
        set_edit_news_open(true)
        set_news_id(id)
    }

    // ////////////////
    // CLose EDITOR////////////////////
    function  EditClose(value){
        console.log(value)
        set_edit_news_open(value)
    }

    // //////////////////////////////



    // //////////////////////////////////////////////////
  return (
    <div className="admin-main-container">
        <AdminSideBar></AdminSideBar>

        {/* EDITOR NEWS COMPOTNENT /////////////////////////////////////////////// */}
        {
            editnewsopen? <AdminNewsEdit set_news_id={news_id} closeEdit={EditClose}></AdminNewsEdit>:""
        }
 
        {/* END/////////////////////////////////////////////////////////////////////// */}
         
         
        <div className="news-main-container">
            
            {/* ////////////////////////////////////////////////////////////////////////////// */}
            {/* GET ALL THE NEWS?????/////////////////////////////////////////////////////////// */}
            <div className="news-show-container">

                {/* total news  */}
                <div className="total-news">
                 <p>{getnews_state&&getnews_state.data.length}</p>   <p>Total news</p>
                </div>
               
                 <div className="news-top-gap">

                 </div>
                {/* loading////////////////////// */}
                {
                    getnews_state.loading?
                    <div className='loading-container'><Loader></Loader></div>:""
                }
                {/* ///////////////////////////////////////////////////////////////// */}
                {
                    getnews_state.data&&getnews_state.data.map((data)=>{
                        return (
                            <div className='news-box-container'>

                                {/* delete news */}
                                <div className="delete-news">
                                 <i class="fa-solid fa-pen-to-square" onClick={()=>EditNews(data._id)}></i> <i class="fa-solid fa-trash" onClick={()=>DeleteNews(data._id)}></i>
                                </div>
                                {/* delte news */}


                                <div className="news-box-photo-parent">
                                    <img src={data.photo} alt="" />
                                </div>
                                <div className="title-descrition">
                                    <div className="title-date">
                                        <h5>{data.title}</h5><p>{data.programdate==null?"":formatDistanceToNow(new Date((data.programdate)))}</p>
                                    </div>
                                    <div className='news-des'>
                                        <p>{data.des.slice(0,150)}<span className = "news-read-more"  onClick={()=>EditNews(data._id)}><br></br>{data.des.length < 150?"":".  .  .   read more"}</span></p>
                                        <span className="news-created-date">
                                            {formatDistanceToNow(new Date((data.createdAt)))}
                                        </span>
                                    </div>
                                       

                                </div>
                               
                               
                            </div>
                        )
                        
                    })
                }
            </div>
            {/* ////////////////////////////////////////////////////////////////////////////// */}

            {/* ///////////////////////////////////////////////////////////////////////// */}
            {/* /////////////////////////////////////////////////////////////////////////////////// */}
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
            {/* error message ============================== */}
            {
                state.error?
                
                <div className="news_error_message">
                  
                  <p>{state.error_message&&state.error_message}</p>
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
                    <PhotoPreview width={"85%"} height={"35vh"} getfile={getfile} setfile={preview}  required={state.empty_field&&state.empty_field.includes("file")?true:false}></PhotoPreview>
                    
                    <div className="news-title-date-container">

                            <div className="news-title">
                             
                                <input type="text" style={{border:`${state.empty_field&&state.empty_field.includes("title")?"2px solid red":""}`}} value={news_data.title}placeholder='please add title' onChange={(e)=>set_news_data({...news_data,title:e.target.value})}/>
                            </div>

                            <div className="news-date">
                              
                                <input type="date"  placeholder='Date' value={news_data.programdate} onChange={(e)=>set_news_data({...news_data,programdate:e.target.value})} />
                            </div>
                          
                    </div>
                    <div className="new-des-container">
                               
                                <textarea type="textarea" value={news_data.des} style={{border:`${state.empty_field&&state.empty_field.includes("des")?"2px solid red":""}`}}placeholder='please add detail' onChange={(e)=>set_news_data({...news_data,des:e.target.value})} />
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