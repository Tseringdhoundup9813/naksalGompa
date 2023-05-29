
const BannerModel = require("../Models/BannerModel")


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


        bannerImage.banner.mv(`Upload/${filename}`,async (error)=>{
            if(error){
                return  res.status(500).json({sucess:false,message:"server error"})

            }
 
            // check wheather banner already exits or not 

            // image path
            const bannerpath = `${req.protocol}://${req.get("host")}/${filename}`
            
            // check banner exist
            const bannerExist = await BannerModel.find({})

         
            if(bannerExist.length < 1){
                const newbanner = await BannerModel.create({ banner:bannerpath})
                if(newbanner){
                    console.log("created")
                    return  res.status(200).json({sucess:true,message:"Sucessfully upload"})

                }
            }

            // if exist banner then find the existing banner and update that 
            if(bannerExist.length > 0){
                
                const exist_banner = await BannerModel.find({})
                const id = exist_banner[0]._id
                const pushbanner = await BannerModel.findByIdAndUpdate({_id:id},{banner:bannerpath})
                if(pushbanner){
                    console.log("created")
                   return res.status(200).json({sucess:true,message:"Sucessfully upload"})
                }
                
            }
        })
    

}

// /////////////////////////////////////////////////////////////////////////////////////////