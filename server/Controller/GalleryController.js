const GalleryModel = require('../Models/GalleryModel')
const fs = require("fs")




// upload team
exports.UploadGallery = async(req,res)=>{
    // getting json from body ===================
    const {category} = req.body
    // =====================================
    // getting file
    const file = req.files
   
    // //////////////////
    let emptyfield = []

    // check req if empty or not 
    if(category.length<1){
        emptyfield.push("category")
    }
    if(file==undefined){
        emptyfield.push("file")
    }
    if(emptyfield.length > 0){
        const get_all_gallery= await GalleryModel.find({}).sort({createdAt:-1})
        return res.status(400).json({error:true,message:"please provide all the field",emptyfield,data:get_all_gallery})
        
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
        const filepath =`${req.protocol}://${req.get("host")}/Gallery/${category}/${random_number+"_"+ photo_name}`

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
            const photoUploadServer_path = create_gallery.photo.split("/")[5]
            console.log(photoUploadServer_path)
            //////////////////////////////////////////////////////////////
             if(fs.existsSync(`Upload/gallery/${category}`)){

             }
             else{
                fs.mkdirSync(`Upload/Gallery/${category}`)
             }
            // after successfull creating news in database upload a photo file to server upload note:folder
            file.photo.mv(`Upload/Gallery/${category}/${photoUploadServer_path}`,((err)=>{
                
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
        
      

      
       
        if(deletedphoto!==undefined){
            const categoryfolder = deletedphoto.photo.split("/")[4];
            const deleted_file = deletedphoto.photo.split('/')[5];
            console.log(deleted_file)

            const category = req.query.category||"all";
            
            if(category=="all"){
                const allGallery = await GalleryModel.find({}).sort({createdAt:-1})
                const success_delted_file = fs.unlinkSync(`Upload/Gallery/${categoryfolder}/${deleted_file}`)
                res.status(200).json({success:true,data:allGallery})
     
     
             }else{
                 const allGallery = await GalleryModel.find({category}).sort({createdAt:-1})
                 const success_delted_file = fs.unlinkSync(`Upload/Gallery/${categoryfolder}/${deleted_file}`)
                 res.status(200).json({success:true,data:allGallery})

             }

           
        }

      
    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})

    }
}


exports.MasonryGallery=async(req,res)=>{
    try{
        const limit = Number(req.query.limit)||16;
        const page = Number(req.query.page)||1;
      
        const category = req.query.category||"all";

        // let skip = (page-1) * limit;

        // apiData = apiData.skip(skip).limit(limit)
        
        if(category=="all"){
           let totalgallery = await GalleryModel.find({}).sort({createdAt:-1})
           totalgallery = totalgallery.length;
           const allGallery = await GalleryModel.find({}).sort({createdAt:-1}).limit(limit*1).skip((page-1)*limit);
           res.status(200).json({success:true,data:allGallery,total:totalgallery})


        }else{
            let totalgallery = await GalleryModel.find({category}).sort({createdAt:-1})
            totalgallery = totalgallery.length;
            const allGallery = await GalleryModel.find({category}).sort({createdAt:-1}).limit(limit*1).skip((page-1)*limit);
            res.status(200).json({success:true,data:allGallery,total:totalgallery})


        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})

    }
}