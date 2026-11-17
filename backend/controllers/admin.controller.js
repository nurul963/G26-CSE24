import { User } from "../models/user.model.js"

export const getAllUsers=async(req,resp)=>{
    try {
        const users=await User.find();
        if(users.length===0){
            return resp.status(200).json({
                message:"User not found",
                success:true
            })
        }
        return resp.status(200).json(users);
    } catch (error) {
       return resp.status(500).json({
        message:error.message,
        success:false
       }) 
    }
}