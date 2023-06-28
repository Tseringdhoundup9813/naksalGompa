const { default: mongoose } = require("mongoose")
const moongose = require("mongoose")

const Scheme = mongoose.Schema

const ContactModel = new Scheme({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        
    },
    phone:{
        type:Number,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    seen:{
        type:Boolean,
        required:false,
        default:false,

    }

   
    
},{timestamps:true})

module.exports = mongoose.model("Contact",ContactModel)