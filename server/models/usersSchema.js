const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{type: String,reqruied:true},
    lastname:{type:String,required:true},
    email:{type: String,reqruied:true,unique:true},
    mobile:{type:String,required:true,unique:true},
    password:{type: String,reqruied:true},
    
})


const User = mongoose.model('User',userSchema)

module.exports = User