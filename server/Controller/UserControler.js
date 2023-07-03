
const userModel = require("../Models/UserModel")


// login
exports.login = async(req,res)=>{
    res.json({message:"login"})
}

// singup user
exports.singup = async(req,res)=>{
    const {username,password} = req.body
   
    try{
        const user = await userModel.singup(username,password)
        res.status(200).json({data:user})
    }
    catch(err){
            res.status(500).json({message:err.message})
    }
    
}


