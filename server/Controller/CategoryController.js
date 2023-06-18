const CategoryModel = require("../Models/CategoryModel")

// upload category

exports.UploadCategory =async(req,res)=>{
          console.log(req.body)
          let {category} = req.body
          const exits = await CategoryModel.find({})
       
          category = category.toLowerCase()
        
    
          if(exits.length > 0){
            if(exits[0].category.includes(category)){
              return  res.status(400).json({success:false,message:"category already exist"})
              
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

// //////////////////////