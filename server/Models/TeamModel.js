
const moongose = require("mongoose")


const Schema = moongose.Schema


const TeamModel = new Schema({

    photo:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    }

},{timestamps:true})

module.exports = moongose.model("Team",TeamModel)