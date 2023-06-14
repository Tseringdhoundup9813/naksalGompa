
const StudentModel = require("../Models/StudentModel")
const fs = require("fs")


// upload team
exports.UploadStudent= async(req,res)=>{
    // getting json from body ===================
    const {position,name,age} = req.body
   
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
    if(age.length < 1){
        emptyfield.push("age")
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
     
        const filepath =`${req.protocol}://${req.get("host")}/Student/${random_number+"_"+ photo_name}`

        /////////////////////////////////////////////////////////////////////////

        // LOGIC TO CREATE A DATA IN DATABASE///////////////////////////////////
        const create_student = await StudentModel.create({photo:filepath,position,name,age})
        const get_all_student = await  StudentModel.find({}).sort({createdAt:-1})
        // ///////////////////////////////////////////////////////////////////////////////

        

        // IF DATA IS NOT STORE IN DATABASE SHOW ERROR
        ////////////////////////////////////////
        if(!create_student==undefined){
            return  res.status(500).json({success:false,message:"due to some error news is not create"})
        }
        ///////////////////////////////////////////////


        // SUCCESS TO STORE DATA IN DATABASE 
        else{
            // get a photo path from database///////////////////////////////
            const photoUploadServer_path = create_student.photo.split("/")[4]
            console.log(photoUploadServer_path)
            //////////////////////////////////////////////////////////////
             
            // after successfull creating news in database upload a photo file to server upload note:folder
            file.photo.mv(`Upload/Student/${photoUploadServer_path}`,((err)=>{
                
                // if error occur upload a photo to server 
                if(err){
                    console.log(err.message)
                    return  res.status(500).json({success:false,message:"server error"})
                }
                // ////////////////////////////////////////////////////////////////////

                // successfull uploading photo to server and adding data to database show response with success message 
                else{
                    console.log('successfully created')
                    return res.status(200).json({success:true,message:"Sucessfully upload",data: get_all_student})
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
exports.GetStudent=async (req,res)=>{
    try{
        const allTeam = await StudentModel.find({}).sort({createdAt:-1})
        
        res.status(200).json({success:true,data:allTeam})
    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})
    }
}

// //////////////////////

// //////////////////////

// DELETE A TEAM
exports.DeleteStudent=async(req,res)=>{
    try{
        
        const {id} = req.params
        console.log(id)
        const deletedteam = await StudentModel.findByIdAndDelete({_id:id})
      
      
       
        if(deletedteam!==undefined){
            const deleted_file = deletedteam.photo.split('/')[4];
            const success_delted_file = fs.unlinkSync(`Upload/Student/${deleted_file}`)

            const all_team = await StudentModel.find({}).sort({createdAt:-1})
            res.status(200).json({success:true,data:all_team})
        }

      
    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})

    }
}

// //////////////////////////////////



// EDIT TEAM
// /////////////////////////////////////////////////////////////////////////////

exports.EditStudent=async(req,res)=>{


    const {id} = req.params
    const {position,name,age} = req.body
    const file = req.files

    try{
   
        if(file==null){
           
            const updatenews = await StudentModel.findByIdAndUpdate({_id:id},{position,name,age})
            console.log(updatenews)
            const all_team = await StudentModel.find({}).sort({createdAt:-1})
            return res.status(200).json({success:true,message:"Sucessfully upload",data:all_team})
        }
       
        else if(file!==null){
             
                let photo_name = file.photo.name
                // if image name have any gap between name then it will cut the gap
                photo_name = photo_name.split(" ").join("")
                // photo path ===================================================
                const random_number = Math.floor(Math.random() * 1000)
                const filepath =`${req.protocol}://${req.get("host")}/Student/${random_number+"_"+ photo_name}`
               
                const update_team = await StudentModel.findByIdAndUpdate({_id:id},{position,name,photo:filepath,age})
                
                const photo_update = await StudentModel.findById({_id:id})
                const all_team = await StudentModel.find({}).sort({createdAt:-1})
            
                ////////////////////////////////////////
            if(!update_team==undefined){
                return  res.status(500).json({success:false,message:"due to some error news is not create"})
            
            }
            ///////////////////////////////////////////////
            // SUCCESS TO STORE DATA IN DATABASE 
            else{
            // get a photo path from database///////////////////////////////
            const photoUploadServer_path = photo_update.photo.split("/")[4]
            const delete_file = update_team.photo.split("/")[4]
         
            //////////////////////////////////////////////////////////////
             
            // after successfull creating team in database upload a photo file to server upload note:folder
            file.photo.mv(`Upload/Student/${photoUploadServer_path}`,((err)=>{
                
                // if error occur upload a photo to server 
                if(err){
                    return  res.status(500).json({success:false,message:"server error"})
                }
                // ////////////////////////////////////////////////////////////////////
                // successfull uploading photo to server and adding data to database show response with success message 
                else{
                    console.log('sucess')
                    fs.unlinkSync(`Upload/Student/${delete_file}`)
                    return res.status(200).json({success:true,message:"Sucessfully upload",data:all_team})
                }
            }))
            // ////////////////////////////////////////////////////////////////////////////////////////////////

         
        }
        // 
            
        }
        
           
    }
    catch(err){
        res.status(500).json({sucess:false,message:"server error"})
    }   
}

// //////////////////////////////////////