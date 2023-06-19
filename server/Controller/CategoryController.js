const CategoryModel = require("../Models/CategoryModel")
const GalleryModel = require('../Models/GalleryModel')
const fs = require("fs")

// upload category

exports.UploadCategory =async(req,res)=>{
          
          let {category} = req.body
           // //////////////////
          let emptyfield = []

          // check req if empty or not 

          if(category.length<1){
              emptyfield.push("category")
          }
         
          const exits = await CategoryModel.find({})
          category = category.toLowerCase()


          if(emptyfield.length > 0){
              return res.status(400).json({error:true,message:"please provide all the field",emptyfield,data:exits})
              
          }


       
        
        
    
          if(exits.length > 0){
            if(exits[0].category.includes(category)){
              return  res.status(400).json({success:false,message:"category already exist",data:exits})
              
            }

            const id = exits[0]._id
            const updateCategory = await CategoryModel.findByIdAndUpdate({_id:id},{$push:{category}})
            console.log("add a new value")
            const allCategory = await CategoryModel.find({}).sort({createdAt:-1})

            res.status(200).json({success:true,data:allCategory})

          }
          else{
            const all = await CategoryModel.create({category:"all"})
            const exits = await CategoryModel.find({})

            const id = exits[0]._id
            const updateCategory = await CategoryModel.findByIdAndUpdate({_id:id},{$push:{category}})
            // const createCategory = await CategoryModel.create({category})
            console.log("create a category")
            const allCategory = await CategoryModel.find({}).sort({createdAt:-1})

            res.status(200).json({success:true,data:allCategory})

          }

          console.log(exits.length)
}

// ///////////////////////////////////////
// GET A TEAM 
exports.GetCategory=async (req,res)=>{
  try{
      const allCategory = await CategoryModel.find({}).sort({createdAt:-1})
      
      res.status(200).json({success:true,data:allCategory})
  }
  catch(err){
      console.log(err)
      res.status(500).json({sucess:false,message:"server error"})
  }
}


exports.ReplaceCategory = async(req,res)=>{
  try{
  
      const {old_category,new_category,index} = req.body;

      const exits = await CategoryModel.find({})
    
      const id = exits[0]._id;
      let categorylist = exits[0].category;
      categorylist[index] = new_category;
     

    

      const photoexits = await GalleryModel.find({category:old_category});
      console.log(photoexits.length)
      if(photoexits.length < 1){
        const changecategory = await CategoryModel.findByIdAndUpdate({_id:id},{'$set':{category:categorylist}})
        const all_category= await CategoryModel.find({});
        res.status(200).json({success:true,data:all_category})
      }

      else if(photoexits.length > 0){
      
        const updategallerycategory = await GalleryModel.updateMany({category:old_category},{$set:{category:new_category}})
        const changecategory = await CategoryModel.findByIdAndUpdate({_id:id},{'$set':{category:categorylist}})
        const all_category= await CategoryModel.find({});
        res.status(200).json({success:true,data:all_category})
       

      }

    
      


     
  }
  catch(err){
    console.log(err)
    res.status(500).json({sucess:false,message:"server error"})

  }
}
// //////////////////////

// delete category and image 

exports.DeleteCategory_Photo=async(req,res)=>{
  try{
    
    const {category,index} = req.params
    const exits = await CategoryModel.find({})
    
    const id = exits[0]._id;
    let categorylist = exits[0].category;
    categorylist.splice(index,1)



    const changecategory = await CategoryModel.findByIdAndUpdate({_id:id},{'$set':{category:categorylist}})
    
    if(changecategory!==undefined){
       const photoexits = await GalleryModel.find({category})
       if(photoexits.length>0){
        const deleteallphoto = await GalleryModel.deleteMany({category})
      
        if(deleteallphoto.acknowledged){
          fs.rmSync(`Upload/Gallery/${category}`,{recursive:true})
          const all_category = await CategoryModel.find({});
          const all_gallery = await GalleryModel.find({}).sort({createdAt:-1})
          return  res.status(200).json({success:true,data:all_category,photo:all_gallery})
 
        }
       }
     
        const all_category = await CategoryModel.find({});
         
         const all_gallery = await GalleryModel.find({}).sort({createdAt:-1})
         res.status(200).json({success:true,data:all_category,photo:all_gallery})
       

       
    }

    // categorylist[index] = new_category;


  }catch(err){
     res.status(500).json({sucess:false,message:"server error"})

  }
}