
const userModel = require("../Models/UserModel")
const jwt = require("jsonwebtoken")


const createToken = (_id)=>{
    // console.log(process.env.SECRETE)
    return jwt.sign({_id},process.env.SECRETE,{expiresIn:"3d"})

}





// login
exports.login = async(req,res)=>{
    const {username,password} = req.body
    console.log(password)

    try{
        const user= await userModel.login(username,password)
        const token = createToken(user._id)

        res.status(200).json({username,token})
    }
    catch(err){
        res.status(400).json({message:err.message})

    }
}

// singup user
exports.singup = async(req,res)=>{
    const {username,password} = req.body
   
    try{
        const user = await userModel.singup(username,password)
        const token = createToken(user._id)
        
        res.status(200).json({data:user,token})
    }
    catch(err){
            res.status(400).json({message:err.message})
    }
    
}


