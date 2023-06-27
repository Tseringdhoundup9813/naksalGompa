import React, { useEffect, useState } from 'react'
import ImageLoading from './ImageLoading';

function GalleryPhoto(props) {
  const[gallery,set_gallery] = useState([]);
  const[column,set_column] = useState([0,1,2,3])
  const[preview,set_preview_photo] = useState();


  const masonrydata = function (columns,posts){
    const masonry_container = document.querySelector(".user-gallery-main-container");
    let wrapper = []
    for(let i =0;i<columns;i++){
         
         wrapper[`column${i}`] = []
         // set_columnWrapper()
    }
 
     for(let a= 0;a< posts.length;a++){
         
         let column = a %columns;
         wrapper[`column${column}`].push(posts[a])
 
     }
     return wrapper;
       
   }
   useEffect(()=>{
    
    let prviousScreenSize = window.innerWidth;
    window.addEventListener("resize",()=>{
      // imageIndex = 0;
      if(window.innerWidth<600&&prviousScreenSize >=600){
         set_gallery(masonrydata(2,props.gallerydata))
         set_column([0,1])
         
      }else if(window.innerWidth >=600&&window.innerWidth<1000&&(prviousScreenSize<600||prviousScreenSize>=1000)){
        set_gallery(masonrydata(3,props.gallerydata))
        set_column([0,1,2])



      }
      else if(window.innerWidth >=1000&&prviousScreenSize <1000){
        set_gallery(masonrydata(4,props.gallerydata))
        set_column([0,1,2,3])
      }

    })

    if(prviousScreenSize < 600){
      set_gallery(masonrydata(2,props.gallerydata))
      set_column([0,1])


    }else if(prviousScreenSize >=600&&prviousScreenSize < 1000){
      set_gallery(masonrydata(3,props.gallerydata))
      set_column([0,1,2])


    }
    else{
      set_gallery(masonrydata(4,props.gallerydata))
      set_column([0,1,2,3])

    }


   },[props.gallerydata])


  //  preview_photo
  function preview_photo(src){
    console.log(src);
    set_preview_photo(src);
  }
  function canclePreview(){
    set_preview_photo();
  }
  console.log(!preview==undefined);
   
  return (
    <>
      
    {
    
      column.map((column)=>{
        return <div>
          {
             gallery[`column${column}`]&&gallery[`column${column}`].map((data)=>{
              return<span onClick={()=>preview_photo(data.photo)}>
                <ImageLoading src={data.photo}></ImageLoading>
                <i class="fa-solid fa-arrow-pointer"></i>
                </span>
            })
          }
        </div>
      })
    }
      {
        preview!==undefined ?
            <div className="preview-photo-section">
                <div className="div">
                  <img src={preview} alt="" />
                  <i class="fa-regular fa-rectangle-xmark" onClick={canclePreview}></i>
                </div>
            </div>
        :""
      }

    </>
  )
}

export default GalleryPhoto