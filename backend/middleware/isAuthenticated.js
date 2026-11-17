import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../utils/env.js';
export const isAuthenticated=async(req,resp,next)=>{
    const token=req.headers?.authorization?.split(" ")[1] || null;
    if(!token){
        return resp.status(401).json({
            message:"Token is missing",
            success:false
        })
    }
    try {
        const decode=await jwt.verify(token,ACCESS_TOKEN_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        return resp.status(500).json({
            message:error.message,
            success:false
        })
    }
}