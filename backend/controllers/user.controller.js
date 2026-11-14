import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
export const register=async(req,resp)=>{
    try {
       const {name,email,password}=req.body;
       if(!name.trim() || !email.trim() || !password){
        return resp.status(400).json({
            message:"Bad request",
            success:false
        })
       }
       //user already exsist
       const exsist=await User.find({email}); 
       if(exsist && exsist.length>0){
        return resp.status(400).json({
            message:"User already exsist with this account",
            success:false
        })
       }
       const hashPass=await bcrypt.hash(password,10);
       const user=await User.create({
        name,email,password:hashPass
       });
       await user.save();
       return resp.status(201).json({
        message:"user created",
        success:true,
        id:user._id,
        name:user.name,
        email:user.email
       })
    } catch (error) {
       return resp.status(500).json({
        message:error.message,
        success:false
       }) 
    }
}