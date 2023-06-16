const DirectorModel = require("../Models/DirectorModel");
const fs = require('fs');



// upload Director
// ///////////////////////////////////////////////////

exports.UploadDirector =async(req,res)=>{

    const {name,des} =req.body;
    const file = req.files;

    let emptyfield = []

    // check req if empty or not 

    if(name.length<1){
        emptyfield.push("name")
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

    

    try{
        const exits = await DirectorModel.find({});
        let filename = `${file.photo.name}`
        filename = filename.split(" ").join("")
        // image path
        const directorpath = `${req.protocol}://${req.get("host")}/Director/${filename}`

        /////////////////////////////////////////////////////////////////////////
  



        if(exits.length < 1){
            const create_director = await DirectorModel.create({name,des,photo:directorpath})
          
            if(!create_director){
                console.log("not created a director")

                return  res.status(500).json({success:false,message:"server error"})
                
            }
            
            
            console.log('created')
                const director_data = await DirectorModel.find({})
                const photoUploadServer_path = create_director.photo.split("/")[4]
                console.log(photoUploadServer_path)

                        
                    // after successfull creating team in database upload a photo file to server upload note:folder
                    file.photo.mv(`Upload/Director/${photoUploadServer_path}`,((err)=>{
                        
                        // if error occur upload a photo to server 
                        if(err){
                            return  res.status(500).json({success:false,message:"server error"})
                        }
                        // ////////////////////////////////////////////////////////////////////
                        // successfull uploading photo to server and adding data to database show response with success message 
                        else{
                            console.log('sucess')
                            return res.status(200).json({success:true,message:"Sucessfully upload",data:director_data})
                        }
                    }))
                    // ////////////////////////////////////////////////////////////////////////////////////////////////

            
  


        }
        if(exits.length > 0){
            const director_data = await DirectorModel.find({})

            const id = director_data[0]._id
            
            const updateDirector = await DirectorModel.findByIdAndUpdate({_id:id},{name,des,photo:directorpath})
            console.log('already exist');
            if(!updateDirector){
                return  res.status(500).json({success:false,message:"server error"})
            }

            const director_update_data = await DirectorModel.find({})
                const photoUploadServer_path = director_update_data[0].photo.split("/")[4]
                const delete_file = director_data[0].photo.split("/")[4]

                console.log(photoUploadServer_path)

                        
                    // after successfull creating team in database upload a photo file to server upload note:folder
                    file.photo.mv(`Upload/Director/${photoUploadServer_path}`,((err)=>{
                        
                        // if error occur upload a photo to server 
                        if(err){
                            return  res.status(500).json({success:false,message:"server error"})
                        }
                        // ////////////////////////////////////////////////////////////////////
                        // successfull uploading photo to server and adding data to database show response with success message 
                        else{
                            console.log('sucess')
                            fs.unlinkSync(`Upload/Director/${delete_file}`)

                            return res.status(200).json({success:true,message:"Sucessfully upload",data:director_update_data})
                        }
                    }))
                    // ////////////////////////////////////////////////////////////////////////////////////////////////

            



        }

        
    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})
    }

}
// end============================================


// GET A TEAM 
exports.GetDirector=async (req,res)=>{
    try{
        const director= await DirectorModel.find({}).sort({createdAt:-1})
        
        res.status(200).json({success:true,data:director})
    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})
    }
}

// //////////////////////



// DELETE A TEAM
exports.DeleteDirector=async(req,res)=>{
    try{
        
        const {id} = req.params
        console.log(id)
        const deletedteam = await DirectorModel.findByIdAndDelete({_id:id})
        console.log(deletedteam)
      
      
       
        if(deletedteam!==undefined){
            const deleted_file = deletedteam.photo.split('/')[4];
            const success_delted_file = fs.unlinkSync(`Upload/Director/${deleted_file}`)

            const all_team = await DirectorModel.find({}).sort({createdAt:-1})
            res.status(200).json({success:true,data:all_team})
        }

      
    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})

    }
}

// //////////////////////////////////




exports.EditDirector=async(req,res)=>{


    const {id} = req.params
    const {name,des} = req.body
    const file = req.files

    try{
   
        if(file==null){
           
            const updatenews = await DirectorModel.findByIdAndUpdate({_id:id},{des,name})
            console.log(updatenews)
            const all_team = await DirectorModel.find({}).sort({createdAt:-1})
            return res.status(200).json({success:true,message:"Sucessfully upload",data:all_team})
        }
       
        else if(file!==null){
             
                let photo_name = file.photo.name
                // if image name have any gap between name then it will cut the gap
                photo_name = photo_name.split(" ").join("")
                // photo path ===================================================
                const random_number = Math.floor(Math.random() * 1000)
                const filepath =`${req.protocol}://${req.get("host")}/Director/${random_number+"_"+ photo_name}`
               
                const update_team = await DirectorModel.findByIdAndUpdate({_id:id},{des,name,photo:filepath})
                
                const photo_update = await DirectorModel.findById({_id:id})
                const all_team = await DirectorModel.find({}).sort({createdAt:-1})
            
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
            file.photo.mv(`Upload/Director/${photoUploadServer_path}`,((err)=>{
                
                // if error occur upload a photo to server 
                if(err){
                    return  res.status(500).json({success:false,message:"server error"})
                }
                // ////////////////////////////////////////////////////////////////////
                // successfull uploading photo to server and adding data to database show response with success message 
                else{
                    console.log('sucess')
                    fs.unlinkSync(`Upload/Director/${delete_file}`)
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