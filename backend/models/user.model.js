import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    role:{
        type:String,
        required:true,
        enum:['ADMIN','STUDENT','TRAINER'],
        default:'STUDENT'
    }
},{timestamps:true});
export const User=mongoose.model("User",userSchema);