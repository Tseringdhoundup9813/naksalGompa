import React,{useState,useEffect} from 'react'
import axios from "../Services/Instance"
import "../AdminStyle/uploadbanner.css"

// side bar
import AdminSideBar from './AdminSideBar'

function UploadBanner() {




    // 
    const [file,set_file] = useState()
    const[imgsrc,set_imgsrc] = useState()
    const[progressbar,set_progressbar] = useState();



    
    useEffect(()=>{
        if(file!==null){
        
            const baner_preview = document.querySelector(".preview-img-section")
            var blob = new Blob([file], { type: 'application/octet-stream' });
            const imgsrc = URL.createObjectURL(blob)

            baner_preview.style.backgroundImage = `url(${imgsrc})`
            set_progressbar(0)


        }

    },[file])
   
    
    

    // file upload 
    async function fileUpload(e){
        e.preventDefault()
        const formdata = new FormData();
        formdata.append("banner",file)

        try{
            const repsonse = await axios.post("bannerupload",formdata,

            {onUploadProgress:({loaded,total})=>{
                console.log(loaded)
                set_progressbar(Math.floor((loaded/total) *100));  
            }})
     
    
        }
        catch(err){
            console.log(err)
            set_progressbar(0)
        }
       

    }


    // cancle previe w=======================================================
    function handleCanclePreview(){
        set_file();
        set_progressbar(0)
    }

    // check file size is good or bad
    const CheckFileSize =(size)=>{
        const oneMb =( 1000000 * 2.2)
        let filesize = Math.floor((size/oneMb) * 100)
        return filesize< 100?filesize:"98"
  

        
    }

    // 

  return (

    


    <div className="upload-main-container">

    {/* side bar */}

    <AdminSideBar></AdminSideBar>
    

    <div className='uploadbanner-container'>
        <form onSubmit={fileUpload} action="" method='post' encType='multipart/form-data'>

            <div className="banner-upload-section"  >
                <input class ="uploadbannerbutton" accept=" image/gif, image/jpeg" type="file" id="file" onChange={(e)=>set_file(e.target.files[0])}/>
                     <label for ="file" className='upload-container-section'>

                        {/* image preview section */}
                         <div className="preview-img-section" >
                          
                         </div>
                         {/* image preivewi end ================================== */}
                        
                        
                        <i class="fa-solid fa-file-arrow-up"></i>
                        <p>Choose a file and <span>upload</span> </p>
                        <div className="dotted-border">

                        </div>
                 </label>
            </div>

            {/* section =================================================================================================== */}
            {
                file!=null?
                <div className="banner-upload-button-section">

                            <div className="file-size-container">
                        
                        
                        {/* cancle preview  */}
                    
                            <div className="cancle-preview" onClick={handleCanclePreview}>
                                <i class="fa-solid fa-xmark"></i>
                            </div>

                        {/* //////////////////////////////////////////////////// */}
                                <div className="file-size-check">        
                                    <div className="file-size-inner" >
                                        {/* <i class="fa-solid fa-map-pin"></i> */}
                                            <i class="fa-solid fa-location-dot"    style={{left:`${CheckFileSize(file.size)}%`}}></i>
                                        
                                    </div>
                                    <div className="file-size-description">

                                        <p>good size</p>
                                        <p>think more</p>
                                        <p>To big</p>
                                    </div>

                                </div>
                            </div>




                
                
                
                <div className="banner-progress-container">

                    <div className="banner-upload-icon">
                        <i class="fa-regular fa-file-image"></i>
                    </div>
                   

                    <div className="banner-progress-bar">
                        <p>{file.name}</p>
                        <div className='progress-bar'>
                            <div className="inner-bar" style={{width:`${progressbar}%`}}>
                                {progressbar&& progressbar > 1?<p>upload...  {progressbar > 1?progressbar:"0"}%</p>
                                :""}
                            </div>
                    
                         </div>

                       
                        <p>{file.size} <span style={{color:"red",fontWeight:"bold"}}>bytes</span> </p>
                       
                       
                    </div>
                  
                </div>
               
                    <button style={{background:`${progressbar==100?"dodgerblue":""}`}}>{progressbar==100?"Sucessfully upload":"Upload File"}</button>
            </div>:""
            }
           
        </form>
    </div>
    </div>

  )
}

export default UploadBanner