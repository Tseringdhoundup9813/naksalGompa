const usermodel = require("../Models/UserModel")
const jwt = require("jsonwebtoken")


const requireAuth =  async (req,res,next)=>{
    // verify authenication 
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"Authorization token required"})
    }
    const token = authorization.split(' ')[1]
    console.log(token)
    try{    
        const {_id} = jwt.verify(token,process.env.SECRETE)
        req.user = await usermodel.findOne({_id}).select("_id")
        next()


    }catch(err){
        console.log(err)
        return res.status(401).json({error:"Request is not Authorized"})

    }


}
module.exports = requireAuth