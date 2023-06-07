
import React,{useState,useEffect}from 'react'



function PhotoPreview(props) {

    
const [file,set_file] = useState()





useEffect(()=>{
    if(file!==null){
    
        const baner_preview = document.querySelector(".preview-img-section")
        var blob = new Blob([file], { type: 'application/octet-stream' });
        const imgsrc = URL.createObjectURL(blob)

        baner_preview.style.backgroundImage = `url(${imgsrc})`
        props.getfile(file)

        // set_progressbar(0)
        if(props.setfile){
            set_file("")
            console.log("delete preivew")
        }
        console.log(props.setfile)
    

    }
    

},[file,props.setfile])


  return (
    <div>
        
        <div className="banner-upload-section" style={{width:`${props.width}`,height:`${props.height}`,border:`${props.required?"2px solid red":""}`}}  >
                <input class ="uploadbannerbutton" accept=" image/gif, image/jpeg" type="file" id="file" onChange={(e)=>set_file(e.target.files[0])}/>
                     <label for ="file" className='upload-container-section'>

                        {/* image preview section */}
                         <div className="preview-img-section" style={{backgroundImage:`url(${props.set_img_src&&props.set_img_src})`}} >
                          
                         </div>
                         {/* image preivewi end ================================== */}
                        
                        
                        <i class="fa-solid fa-file-arrow-up"></i>
                        <p>Choose a file and <span>upload</span> </p>
                        <div className="dotted-border">

                        </div>
                 </label>
            </div>

    </div>
  )
}

export default PhotoPreview