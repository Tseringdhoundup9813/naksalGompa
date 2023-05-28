const moongoose = require("mongoose")

const Schema = moongoose.Schema

let BannerModel = new Schema({
    banner:{
        type:String,
        default:"default.png"
    }
},{timestamps:true});

module.exports = moongoose.model("BannerImage",BannerModel);

   