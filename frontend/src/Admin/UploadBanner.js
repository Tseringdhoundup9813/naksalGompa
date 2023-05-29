import React,{useState,useEffect} from 'react'
import axios from "axios"
import "../AdminStyle/uploadbanner.css"

function UploadBanner() {



    // 
    const [file,set_file] = useState()
    const[imgsrc,set_imgsrc] = useState()
    const[progressbar,set_progressbar] = useState();


    console.log(file);
    
    useEffect(()=>{
        if(file!==null){
        
            const baner_preview = document.querySelector(".preview-img-section")
            var blob = new Blob([file], { type: 'application/octet-stream' });
            const imgsrc = URL.createObjectURL(blob)

            baner_preview.style.backgroundImage = `url(${imgsrc})`
            console.log("this working")

        }

    },[file])
   
    
    

    // file upload 
    async function fileUpload(e){
        e.preventDefault()
        const formdata = new FormData();
        formdata.append("banner",file)

        try{
            const repsonse = await  axios.post("api/naksa/bannerupload",formdata,{onUploadProgress:({loaded,total})=>{
                console.log(loaded);
                console.log(total);
                set_progressbar(Math.floor((loaded/total) *100));
                
            }})
            console.log(repsonse)
            if(repsonse.data.sucess==true){
                setTimeout(function(){
                    set_progressbar(0);
                    set_file();

                },5000)
            }

        }
        catch(err){
            console.log(err)
        }
       

    }


    // cancle previe w=======================================================
    function handleCanclePreview(){
        set_file();
    }

  return (
    <div className='uploadbanner-container'>
       

        <form onSubmit={fileUpload} action="">
            

            <div className="banner-upload-section"  >
                <input class ="uploadbannerbutton" type="file" id="file" onChange={(e)=>set_file(e.target.files[0])}/>
                     <label for ="file" className='upload-container-section'>

                        
                         <div className="preview-img-section" >
                          
                         </div>
                        
                        
                       


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
                            <div className="inner-bar" style={{width:`${progressbar}%`}}>
                            </div>
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