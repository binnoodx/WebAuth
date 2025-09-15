import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
    },
    fullName:{
        type:String,
        default:"user",
    },
    userEmail:{
        type:String
    },
    userPassword:{
        type:String
    },
    userJoined:{
        type:Date
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    userOTP:{
        type:Number
    },
    GenerateDate:{
        type:Date
    },
    forgetPassword:{
        type:String
    },
    forgetPasswordExpiry:{
        type:Date
    }


})

const User = mongoose.models.users || mongoose.model("users" , userSchema)

export default User
