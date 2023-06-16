const moongose = require("mongoose")

const Schema = moongose.Schema

const FounderSchema = new Schema({
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

module.exports = moongose.model('Founder',FounderSchema)