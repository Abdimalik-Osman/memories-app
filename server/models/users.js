const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:[true,'Please add your fullname'],
        unique: true
    },
    username:{
        type:String,
        required:[true,'Please add username'],
        unique: true
    },
    password:{
        type:String,
        required:[true,"Please enter a password"]
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User",userSchema);
module.exports= User;