import React,{useState,useEffect} from 'react'
import axios from "../Services/Instance"
import "../AdminStyle/uploadbanner.css"

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
            console.log(repsonse)
    
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

  return (
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


                     <div className="cancle-preview" onClick={handleCanclePreview}>
                           <i class="fa-solid fa-xmark"></i>
                    </div>
                
                <div className="banner-progress-container">
                    <div className="banner-upload-icon">
                        <i class="fa-regular fa-file-image"></i>
                    </div>
                    
                    <div className="banner-progress-bar">
                        
                        <p>{file.name}</p>
                        <div className='progress-bar'>
                            <div className="inner-bar" style={{width:`${progressbar}%`}}></div>
                         </div>


                        <div className="uploading-progess-number">
                           <p>uploading...  {progressbar > 1?progressbar:"0"}%</p>
                        </div>


                        <p>{file.size} <span style={{color:"red",fontWeight:"bold"}}>bytes</span></p>
                    </div>
                </div>
                    <button style={{background:`${progressbar==100?"dodgerblue":""}`}}>{progressbar==100?"Sucessfully upload":"Upload File"}</button>
            </div>:""
            }
           
               
                     
                

          
        </form>
    </div>
  )
}

export default UploadBanner