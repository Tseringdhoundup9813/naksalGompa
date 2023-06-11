const { default: mongoose } = require("mongoose")
const moongose = require("mongoose")

const Scheme = mongoose.Schema

const NewsModel = new Scheme({
    photo:{
        type:String,
        required:true,
        default:"default.png",
    },
    title:{
        type:String,
        required:true,
        
    },
    des:{
        type:String,
        required:true,
    },

    programdate:{
        type:Date,
        required:false,
        
    }
    



},{timestamps:true})

module.exports = mongoose.model("News",NewsModel)