// const { default: formatRelativeWithOptions } = require("date-fns/fp/formatRelativeWithOptions")
const ContactModel = require("../Models/ContactModel")



exports.SendContact=async(req,res)=>{
    const {name,email,phone,subject,message} = req.body
  
   
    // //////////////////
    let emptyfield = []

    // check req if empty or not 

    if(name.length<1){
        emptyfield.push("name")
    }
  
    if(email.length<1){
       
        emptyfield.push("email")
    }
    if(phone.length < 1){
        emptyfield.push("phone")
    }
    if(subject.length < 1){
        emptyfield.push("subject")
    }
    if(message.length < 1){
        emptyfield.push("message")
    }
 
    if(emptyfield.length > 0){
        return res.status(400).json({error:true,message:"please provide all the field",emptyfield})
        
    }
    try{
        const createmessage = await ContactModel.create({name,email,phone,subject,message});
        return res.status(200).json({success:true,message:"Sucessfully upload"})

    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})
    }



}
// GET A TEAM 
exports.GetContact=async (req,res)=>{
    try{
        const director= await ContactModel.find({}).sort({createdAt:-1})
        
        res.status(200).json({success:true,data:director})
    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})
    }
}

exports.GetSingleContact=async (req,res)=>{
    
    try{
        const updatetoseen = await ContactModel.findByIdAndUpdate({_id:req.params.id},{seen:true})
        const director= await ContactModel.find({_id:req.params.id}).sort({createdAt:-1})
        const all_contact = await ContactModel.find({}).sort({createdAt:-1})
        
        res.status(200).json({success:true,data:director,all:all_contact})
    }
    catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})
    }
}


exports.SetImportant = async(req,res)=>{
    const {id} = req.params
    try{
        
        const singlecontact = await ContactModel.find({_id:id})
        console.log(singlecontact[0].important)
        if(singlecontact[0].important ==true){
            const set_important = await ContactModel.findByIdAndUpdate({_id:id},{important:false})
            const all_contact = await ContactModel.find({}).sort({createdAt:-1})
            const singlecontact = await ContactModel.find({_id:id})
            res.status(200).json({success:true,data:all_contact,singledata:singlecontact})
        }
        else{
            const set_important = await ContactModel.findByIdAndUpdate({_id:id},{important:true})
            const all_contact = await ContactModel.find({}).sort({createdAt:-1})
            const singlecontact = await ContactModel.find({_id:id})
            res.status(200).json({success:true,data:all_contact,singledata:singlecontact})
        }



    }catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"server error"})

    }
}
