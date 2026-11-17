import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken, getRefreshExpiry, hashToken } from "../utils/tokens.js";
import RefreshSession from "../models/RefreshSession.js";
import { NODE_ENV } from "../utils/env.js";
const COOKIE_NAME = "refreshToken";
const cookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: "strict",
  path: "/api/auth"
};
const setRefreshCookie = (res, token) => {
  res.cookie(COOKIE_NAME, token, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};
const clearRefreshCookie = (res) => {
  res.clearCookie(COOKIE_NAME, cookieOptions);
};

export const register=async(req,resp)=>{
    try {
       const {name,email,password,role}=req.body;
       if(!name.trim() || !email.trim() || !password){
        return resp.status(400).json({
            message:"Bad request",
            success:false
        })
       }
       //user already exsist
       const exsist=await User.findOne({email}); 
       if(exsist){
        return resp.status(400).json({
            message:"User already exsist with this account",
            success:false
        })
       }
       const hashPass=await bcrypt.hash(password,10);
       const user=await User.create({
        name,email,password:hashPass,role
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

export const login=async(req,resp)=>{
    try {
        const {email,password}=req.body;
        if(!email.trim() || !password){
            return resp.status(400).json({
                message:"Feild cannot be empty",
                success:false
            })
        }
        const user=await User.findOne({email}).select("+password");
        if(!user){
            return resp.status(404).json({
                message:"User not found",
                success:false
            })
        }
        
        const isMatched=await bcrypt.compare(password,user.password);
      
        if(!isMatched){
            return resp.status(400).json({
                message:"Invalid Credential",
                success:false
            }) 
        }
        console.log(email);
        const refreshToken=generateRefreshToken(user);
        const accessToken=generateAccessToken(user);
        setRefreshCookie(resp,refreshToken);
        console.log(hashToken(refreshToken));
        await RefreshSession.create({
            userId:user._id,
            tokenHash:hashToken(refreshToken),
            expiresAt:getRefreshExpiry(refreshToken)
        });
        return resp.status(200).json({
            message:"Login success",
            success:true,
            id:user._id,
            name:user.name,
            email:user.email,
            accessToken
        })
    } catch (error) {
      return resp.status(500).json({
        message:error.message,
        success:false
      })  
    }
}