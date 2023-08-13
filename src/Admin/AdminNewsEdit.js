import React,{useState,useEffect,useReducer} from 'react'
import "../AdminStyle/NewsEditor.css"
import PhotoPreview from '../components/PhotoPreview'
import axios from '../Services/Instance'
import { INITIAL_STATE,postReducer } from '../Reducer/NewsReducer'
import Loader from '../components/Loader'


function AdminNewsEdit(props) {
    const[getnews_state,getnews_dispatch] = useReducer(postReducer,INITIAL_STATE)
    const[updatenews_state,updatenews_dispatch] = useReducer(postReducer,INITIAL_STATE)
    const[preview,set_preview] = useState(false)

   
    const[news_data,set_news_data] = useState({title:"",des:"",programdate:"",file:""})
    


    // close edit//////
    function closeEdit(){
        props.closeEdit(false)
    }
    // ////////////////////////


      // get a  file from photopreview component
      function getfile(file){
        // set_news_data({...news_data,file:file})
        set_news_data({...news_data,file:file})
      
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
               
                if(response.data.success){
                    
                  
                    const all_news_data = response.data.data
                    getnews_dispatch({type:"FETCH_SUCCESS",payload:[true,all_news_data]})



                    // set a news data 
                    set_news_data({title:all_news_data.title,des:all_news_data.des,programdate:all_news_data.programdate==null?"":all_news_data.programdate,file:all_news_data.photo})


                    // set a default of date

                    if(response.data.data.programdate!==null){
                      
                        const date = response.data.data.programdate
                        console.log("not provided data")
                         document.querySelector(".date-input").value = date.slice(0,date.indexOf("T"))
                        
                    }
                }
            }
            
            catch(err){
              
                console.log(err)
                if(err.message!=="Network Error"){
                    getnews_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message]})
                 
                }
            }
        }

        GetNews()
    },[])
        // 
    // ///////////////////////////////////////////////////////////////////////////
    // /////////////////////////////////////////////////////////////////////////

    // UPDATE A NEWS 
   async function UpdateNews(event){
        event.preventDefault()

        const formdata =new FormData();

        formdata.append("title",news_data.title)
        formdata.append("des",news_data.des)
        formdata.append("programdate",news_data.programdate)
        formdata.append("photo",news_data.file)


        getnews_dispatch({type:"FETCH_START"})
        try{
            const response = await axios.patch(`editnews/${props.set_news_id}`,formdata)
            console.log(response)
            // console.log(response)
            if(response.data.success){
                
                const all_news_data = response.data.data
                getnews_dispatch({type:"FETCH_SUCCESS",payload:[true,all_news_data]})
                window.location.reload(true)
                closeEdit()
               
                // set a default of date
                const date = response.data.data.programdate
             
                if(response.data.data.programdate!==null){
                    const date = response.data.data.programdate
                     document.querySelector(".date-input").value = date.slice(0,date.indexOf("T"))
                    
                }

                // reload the page after sucess and close the editor news
               
                ///////////////////////////////////////////////////////
                
            }
        }
        catch(err){
          
            // console.log(err)
            console.log(err.response)
            if(err.response!==undefined){
                if(err.message!=="Network Error"){
              
                    getnews_dispatch({type:"FETCH_ERROR",payload:[err.response.data.message]})
                            
                }
            }
           
        }
    


    }


    //////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////




  





  return (

   
    <div className="editor-news-background-container">

    <div className="news-editor-main-container">

        {/* loader */}
        {
            updatenews_state.loading?
            <div className='loading-container'><Loader></Loader></div>:""
        }
        {/* /////////// */}

        {/* close the edit */}
        {
    
            <p>{updatenews_state.success}</p>
               
            // updatenews_state.success?props.closeEdit(true):""
        }

        {/*  */}
        

        {/* edit-news-img-title-date-container */}


       
            <div className="close-news-editor">
                <i class="fa-solid fa-square-xmark" onClick={closeEdit}></i>
            </div>
                <form action="" onSubmit={UpdateNews}>
                    <div className="photo-title-date-section">
                        <div className="edit-news-title">
                            Edit news
                            {/* <p>{props.set_news_id}</p> */}
                        </div>
                        <PhotoPreview width={"90%"} height={"40vh"} getfile={getfile} setfile={preview}  set_img_src={getnews_state.data && getnews_state.data.photo}></PhotoPreview>
                        <div className="edit-news-input-title-date-container">
                            <input type="text"  defaultValue={getnews_state.data&& getnews_state.data.title} onChange={(e)=>set_news_data({...news_data,title:e.target.value})} />
                            <input className='date-input' type="date" onChange={(e)=>set_news_data({...news_data,programdate:e.target.value})} />
                            <button>Edit Submit</button>
                        </div>
                        
                    </div>
                    <div className="description-section">
                        <textarea name="" id="" cols="30" rows="10" defaultValue={getnews_state.data &&getnews_state.data.des}  onChange={(e)=>set_news_data({...news_data,des:e.target.value})}></textarea>
                    </div>
                
                </form>
             </div>
        </div>
   
  )
  
}

export default AdminNewsEdit