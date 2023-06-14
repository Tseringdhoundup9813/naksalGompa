
const moongose = require("mongoose")


const Schema = moongose.Schema


const StudentModel = new Schema({

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
    },
    age:{
        type:String,
        required:true,
    }

},{timestamps:true})

module.exports = moongose.model("Student",StudentModel)