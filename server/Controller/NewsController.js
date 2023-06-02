
const NewsModel = require("../Models/News")


// uploading a news from adming site ==================================================================================================
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.UploadNews=async(req,res)=>{
    
    // getting json from body ===================
    const {title,des,programdate} = req.body
    // =====================================
    // getting file
    const file = req.files
    // //////////////////
    let emptyfield = []

    // check req if empty or not 

    if(title.length<1){
        emptyfield.push("title")
    }
  
    if(des.length<1){
       
        emptyfield.push("des")
    }
    if(file==undefined){
        emptyfield.push("file")
    }
    if(emptyfield.length > 0){
        return res.status(400).json({error:true,message:"please provide all the field",emptyfield})
        
    }

   
    // //////////////////////////////

    // check if file not exist then return error and message 
    // if(file==undefined){
    //     return res.status(400).json({error:true,message:"please add file"})
    // }
    let photo_name = file.photo.name
    // if image name have any gap between name then it will cut the gap
    photo_name = photo_name.split(" ").join("")

    try{
        // photo path ===================================================
        const filepath =`${req.protocol}://${req.get("host")}/News/${photo_name}`

        /////////////////////////////////////////////////////////////////////////

        // LOGIC TO CREATE A DATA IN DATABASE///////////////////////////////////
        const create_news = await NewsModel.create({photo:filepath,title,des, programdate})
        const getnews = await NewsModel.find({})
        // ///////////////////////////////////////////////////////////////////////////////


        // IF DATA IS NOT STORE IN DATABASE SHOW ERROR
        ////////////////////////////////////////
        if(!create_news==undefined){
            return  res.status(500).json({success:false,message:"due to some error news is not create"})
          
        }
        ///////////////////////////////////////////////
        // SUCCESS TO STORE DATA IN DATABASE 
        else{
            // get a photo path from database///////////////////////////////
            const photoUploadServer_path = create_news.photo.split("/")[4]
            //////////////////////////////////////////////////////////////
             
            // after successfull creating news in database upload a photo file to server upload note:folder
            file.photo.mv(`Upload/News/${photoUploadServer_path}`,((err)=>{
                
                // if error occur upload a photo to server 
                if(err){
                    return  res.status(500).json({success:false,message:"server error"})
                }
                // ////////////////////////////////////////////////////////////////////

                // successfull uploading photo to server and adding data to database show response with success message 
                else{
                    return res.status(200).json({success:true,message:"Sucessfully upload",getnews})
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
// //////////////////////////////////////////FINISHED/////////////LOGIC////////////////////////////////////////////////////////////////////
////////////////////////////////////////////TSERING////////////////////////////////////////////////////////////////////////////////////////


// GET A NEWS //////////////////////////////////////
exports.GetNews=async (req,res)=>{
    try{
        const allnews = await NewsModel.find({}).sort({createdAt:-1})
        
        res.status(200).json({success:true,data:allnews})
    }
    catch(err){
        console.log(err)
    }
}
// ///////////////////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////////////////////
// DELETE A NEWS DATA//////////////////////////////////////////////////////


exports.DeleteNews =async(req,res)=>{
    try{
        
        const {id} = req.params
        const deletednews = await NewsModel.findByIdAndDelete({_id:id})
        console.log(deletednews!==undefined)
        if(deletednews!==undefined){
            res.status(200).json({success:true,data:deletednews})
        }

      
    }
    catch(err){
        console.log(err)
    }
}

// //////////////////////////////////////////////////