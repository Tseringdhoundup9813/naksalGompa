const moongose = require("mongoose")
const bcrypt = require("bcrypt")


const Schema = moongose.Schema

const userSchema = new Schema({

    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,

    }
})

// static singup method

userSchema.statics.singup = async function(username,password){

    const exists = await this.findOne({username})

    if(exists){
        throw Error("username already in use")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({username,password:hash})
    return user

}

// login static 

userSchema.statics.login = async function(username,password){
    if(!username||!password){
        throw Error('all fields must be filled')
    }
    const users = await this.findOne({username})
    if(!users){
        throw Error('Incorrect username')
    }

    const match = await bcrypt.compare(password,users.password)
    console.log(match)

    if(!match){
        throw Error('Incorrect password')
    }
    return users

}

module.exports = moongose.model("User",userSchema)

