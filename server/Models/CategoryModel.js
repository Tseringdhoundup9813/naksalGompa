const { default: mongoose } = require("mongoose")
const moongose = require("mongoose")

const Scheme = mongoose.Schema

const CategoryModel = new Scheme({

    category:{
        type:Array,
        required:true,
        
    },
    
},{timestamps:true})

module.exports = mongoose.model("Category",CategoryModel)