const moongose = require("mongoose")

const Schema = moongose.Schema

const DirectorSchema = new Schema({
    photo:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,


    },
    des:{
        type:String,
        required:true,
    }
})

module.exports = moongose.model('Director',DirectorSchema)