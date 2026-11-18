import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken, getRefreshExpiry, hashToken, verifyRefreshToken } from "../utils/tokens.js";
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
        const refreshToken=generateRefreshToken(user);
        const accessToken=generateAccessToken(user);
        setRefreshCookie(resp,refreshToken);
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
export const refreshAccessToken=async(req,resp)=>{
    const oldSession=req?.cookies?.[COOKIE_NAME];
    
    if(!oldSession){
        return resp.status(401).json({
            message:"Refresh token missing",
            success:false
        })
    }
    try {
        const decode=verifyRefreshToken(oldSession);
        if(decode.type!=="refresh"){
            return resp.status(401).json({
                message:"Invalid Token"
            })
        }
        const accessToken=generateAccessToken({_id:decode.sub,role:decode.role});
        const oldeRefreshToken=await RefreshSession
                                .findOneAndUpdate(
                                    {
                                        userId:decode.sub,
                                        tokenHash:hashToken(oldSession),
                                        expiresAt:{$gt:new Date()}
                                    },
                                    {
                                        $set:{
                                            revokedAt:new Date()
                                        }
                                    },
                                    {
                                        new:true
                                    }
                                );
        console.log('OLD REFRESH'+ oldeRefreshToken)
        if(!oldeRefreshToken){
            return resp.status(401).json({
                message:"Refresh Token Expired pls login..",
                success:false
            })
        }
        const newRefreshToken=generateRefreshToken({_id:decode.sub,role:decode.role});
        setRefreshCookie(resp,newRefreshToken);
        await RefreshSession.create({
            userId:decode.sub,
            tokenHash:hashToken(newRefreshToken),
            expiresAt:getRefreshExpiry(newRefreshToken)
        });
        return resp.status(200).json({
            message:"New Access Token",
            success:true,
            accessToken
        })
    } catch (error) {
        console.log(error)
       return resp.status(500).json({
        message:"Refresh token has been expired",
        success:false
       }) 
    }
}
export const logout=async(req,resp)=>{
    clearRefreshCookie(resp);
    return resp.status(200).json({
        message:"Lgout Success",
        success:true
    })
}
export const getProfile=async(req,resp)=>{
    const user=await User.findById(req.user.sub);
    if(!user){
        return resp.status(400).json({
            message:"User not found",
            success:false
        })
    }
    return resp.status(200).json(user);
}