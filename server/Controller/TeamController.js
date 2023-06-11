
const TeamModel = require("../Models/TeamModel")
const fs = require("fs")


// upload team
exports.UploadTeam = async(req,res)=>{
    // getting json from body ===================
    const {position,name} = req.body
    console.log(req.body)
    // =====================================
    // getting file
    const file = req.files
   
    // //////////////////
    let emptyfield = []

    // check req if empty or not 

    if(position.length<1){
        emptyfield.push("position")
    }
  
    if(name.length<1){
       
        emptyfield.push("name")
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
        const filepath =`${req.protocol}://${req.get("host")}/Team/${random_number+"_"+ photo_name}`

        /////////////////////////////////////////////////////////////////////////

        // LOGIC TO CREATE A DATA IN DATABASE///////////////////////////////////
        const create_team = await TeamModel.create({photo:filepath,position,name})
        const get_all_team = await TeamModel.find({}).sort({createdAt:-1})

        console.log(create_team)
        
        // ///////////////////////////////////////////////////////////////////////////////


        // IF DATA IS NOT STORE IN DATABASE SHOW ERROR
        ////////////////////////////////////////
        if(!create_team==undefined){
            return  res.status(500).json({success:false,message:"due to some error news is not create"})
        }
        ///////////////////////////////////////////////
        // SUCCESS TO STORE DATA IN DATABASE 
        else{
            // get a photo path from database///////////////////////////////
            const photoUploadServer_path = create_team.photo.split("/")[4]
            console.log(photoUploadServer_path)
            //////////////////////////////////////////////////////////////
             
            // after successfull creating news in database upload a photo file to server upload note:folder
            file.photo.mv(`Upload/Team/${photoUploadServer_path}`,((err)=>{
                
                // if error occur upload a photo to server 
                if(err){
                    console.log(err.message)
                    return  res.status(500).json({success:false,message:"server error"})
                }
                // ////////////////////////////////////////////////////////////////////

                // successfull uploading photo to server and adding data to database show response with success message 
                else{
                    console.log('successfully created')
                    return res.status(200).json({success:true,message:"Sucessfully upload",get_all_team})
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


// GET A TEAM 
exports.GetTeam=async (req,res)=>{
    try{
        const allTeam = await TeamModel.find({}).sort({createdAt:-1})
        
        res.status(200).json({success:true,data:allTeam})
    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})
    }
}

// //////////////////////

// DELETE A TEAM
exports.DeleteTeam=async(req,res)=>{
    try{
        
        const {id} = req.params
        console.log(id)
        const deletedteam = await TeamModel.findByIdAndDelete({_id:id})
      
      
       
        if(deletedteam!==undefined){
            const deleted_file = deletedteam.photo.split('/')[4];
            const success_delted_file = fs.unlinkSync(`Upload/Team/${deleted_file}`)

            const all_team = await TeamModel.find({}).sort({createdAt:-1})
            res.status(200).json({success:true,data:all_team})
        }

      
    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})

    }
}

// //////////////////////////////////