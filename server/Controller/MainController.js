
const BannerModel = require("../Models/BannerModel")


// upload banner//////////////////////////////////////////////////////////////////

exports.uploadBanner = async (req,res)=>{
        console.log(req.files);

        const bannerImage = req.files.banner

        const filename = `${bannerImage.name}`
        bannerImage.mv(filename,async (error)=>{
            if(error){
                res.status(500).json({message:"server error"})

            }

            // await BannerModel.create({banner})
            res.status(200).json({file:`${req.protocol}://${req.get("host")}/${filename}`})
        })
    
        // res.status(200).json({work:"true"})

}

// /////////////////////////////////////////////////////////////////////////////////////////