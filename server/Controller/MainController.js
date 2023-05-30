
const BannerModel = require("../Models/BannerModel")
const fs = require("fs")

// upload banner//////////////////////////////////////////////////////////////////

exports.uploadBanner = async (req,res)=>{
     
        const bannerImage = req.files
        
    //   check file is there or not ====================================
        if(bannerImage==null){
            console.log("not file found")
            return  res.status(400).json({sucess:false,message:"please provide Image"})


        }
// ====================================================================================================

        let filename = `${bannerImage.banner.name}`
        filename = filename.split(" ").join("")
        const bannerExist = await BannerModel.find({})

        // image path
        const bannerpath = `${req.protocol}://${req.get("host")}/Banner/${filename}`
        bannerImage.banner.mv(`Upload/Banner/${filename}`,async (error)=>{
            if(error){
                return  res.status(500).json({sucess:false,message:"server error"})

            }})

          
  // check wheather banner already exits or not 
        if(bannerExist.length < 1){
          
            
            // check banner exist
            const newbanner = await BannerModel.create({ banner:bannerpath})
                if(newbanner){

                   
                    console.log("created")
                    return  res.status(200).json({sucess:true,message:"Sucessfully upload"})

                }
            }

            // if exist banner then find the existing banner and update that 
            else if(bannerExist.length > 0){
                
                const exist_banner = await BannerModel.find({})
                // getting a old img path 
                let old_img_path = exist_banner[0].banner
                console.log(old_img_path.split("/"))
                old_img_path = old_img_path.split("/")[4]
                console.log(old_img_path)
                
                const id = exist_banner[0]._id
                const pushbanner = await BannerModel.findByIdAndUpdate({_id:id},{banner:bannerpath})
               
                if(pushbanner!==undefined){
                    console.log("created")

                // delete old banner image 
                   fs.unlinkSync(`Upload/Banner/${old_img_path}`)

                   return res.status(200).json({sucess:true,message:"Sucessfully upload"})
                }
                
            }
        
    

        }

// /////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Get Banner image from home page

exports.GetBannerImg = async(req,res)=>{
    
    try{
        const bannermodel = await BannerModel.find({})
       
        res.status(200).json(bannermodel)

    }catch(err){
        console.log("error")
    }
}





// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////