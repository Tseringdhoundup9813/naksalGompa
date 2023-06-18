const GalleryModel = require('../Models/GalleryModel')
const fs = require("fs")




// upload team
exports.UploadGallery = async(req,res)=>{
    // getting json from body ===================
    const {category} = req.body
    console.log(req.body)
    // =====================================
    // getting file
    const file = req.files
   
    // //////////////////
    let emptyfield = []

    // check req if empty or not 

    if(category.length<1){
        emptyfield.push("position")
    }
    if(file==undefined){
        emptyfield.push("file")
    }
    if(emptyfield.length > 0){
        return res.status(400).json({error:true,message:"please provide all the field",emptyfield})
        
    }

   
    // //////////////////////////////

    // check if file not exist then return error and message 
    let photo_name = file.photo.name
    // if image name have any gap between name then it will cut the gap
    photo_name = photo_name.split(" ").join("")

    try{
        // photo path ===================================================
        const random_number = Math.floor(Math.random() * 1000)
        console.log(random_number)
        const filepath =`${req.protocol}://${req.get("host")}/Gallery/${random_number+category+"_"+ photo_name}`

        /////////////////////////////////////////////////////////////////////////

        // LOGIC TO CREATE A DATA IN DATABASE///////////////////////////////////
        const create_gallery = await GalleryModel.create({photo:filepath,category})
        const get_all_gallery= await GalleryModel.find({}).sort({createdAt:-1})

        // console.log(create_team)
        
        // ///////////////////////////////////////////////////////////////////////////////


        // IF DATA IS NOT STORE IN DATABASE SHOW ERROR
        ////////////////////////////////////////
        if(!create_gallery==undefined){
            return  res.status(500).json({success:false,message:"due to some error news is not create"})
        }
        ///////////////////////////////////////////////
        // SUCCESS TO STORE DATA IN DATABASE 
        else{
            // get a photo path from database///////////////////////////////
            const photoUploadServer_path = create_gallery.photo.split("/")[4]
            console.log(photoUploadServer_path)
            //////////////////////////////////////////////////////////////
             
            // after successfull creating news in database upload a photo file to server upload note:folder
            file.photo.mv(`Upload/Gallery/${photoUploadServer_path}`,((err)=>{
                
                // if error occur upload a photo to server 
                if(err){
                    console.log(err.message)
                    return  res.status(500).json({success:false,message:"server error"})
                }
                // ////////////////////////////////////////////////////////////////////

                // successfull uploading photo to server and adding data to database show response with success message 
                else{
                    console.log('successfully created')
                    return res.status(200).json({success:true,message:"Sucessfully upload",data:get_all_gallery})
                }
            }))
            // ////////////////////////////////////////////////////////////////////////////////////////////////

         
        }
        // 
      
    }catch(err){
        console.log(err.message)
        res.status(500).json({sucess:false,message:"server error"})


    }
}
// /////////////////////////////////////////////////////////

// GET A NEWS //////////////////////////////////////
exports.GetGallery=async (req,res)=>{
    try{
        const category = req.query.category||"all";

        if(category=="all"){
           const allGallery = await GalleryModel.find({}).sort({createdAt:-1})
           res.status(200).json({success:true,data:allGallery})


        }else{
            const allGallery = await GalleryModel.find({category}).sort({createdAt:-1})
            res.status(200).json({success:true,data:allGallery})


        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})

    }
}
// ///////////////////////////////////////////////////////////////////////////////


exports.DeleteGallery =async(req,res)=>{
    try{
       
        const {id} = req.params
       


        const deletedphoto = await GalleryModel.findByIdAndDelete({_id:id})
        console.log(deletedphoto)
      
      
       
        if(deletedphoto!==undefined){
            const deleted_file = deletedphoto.photo.split('/')[4];

            const category = req.query.category||"all";
            
            if(category=="all"){
                const allGallery = await GalleryModel.find({}).sort({createdAt:-1})
                const success_delted_file = fs.unlinkSync(`Upload/Gallery/${deleted_file}`)
                res.status(200).json({success:true,data:allGallery})
     
     
             }else{
                 const allGallery = await GalleryModel.find({category}).sort({createdAt:-1})
                 const success_delted_file = fs.unlinkSync(`Upload/Gallery/${deleted_file}`)
                 res.status(200).json({success:true,data:allGallery})

             }

           
        }

      
    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})

    }
}