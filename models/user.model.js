const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name:{type:String},
    pass:{type:String,required:true},
    email:{type:String,required:true,unique:true}
},
{versionKey:false}
)

const userModel = mongoose.model("user",userSchema)

module.exports = userModel