const { default: mongoose } = require("mongoose")
const moongose = require("mongoose")

const Scheme = mongoose.Schema

const GalleryModel = new Scheme({
    photo:{
        type:String,
        required:true,
        default:"default.png",
    },
    category:{
        type:String,
        required:true,
        
    },
   
},{timestamps:true})

module.exports = mongoose.model("Gallery",GalleryModel)