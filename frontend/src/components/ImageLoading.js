import React,{useState,useEffect} from 'react'
import {Blurhash} from "react-blurhash"

function ImageLoading({src}) {

    const [imageLoaded,setImageLoaded] = useState(false)

    useEffect(()=>{
        const img = new Image()
        img.onload =()=>{
            setImageLoaded(true)
        }
        img.src = src

    },[src])

  return (
            <>
            {!imageLoaded&&(
                <Blurhash hash="L4R{#?~qt7-;%Mt7WBayayj[ayfQ" width="100%" resolutionX={32} resolutionY={32} punch={1}></Blurhash>
            )}
            
            {imageLoaded&&<img src={src} alt="" className='usergallery-photo'/>}
            </>
  )
}

export default ImageLoading