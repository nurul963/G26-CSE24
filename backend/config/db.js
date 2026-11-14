import mongoose from "mongoose";
import { MONGO_URI } from "../utils/env.js";
export const connectDB=async()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database connected');
    } catch (error) {
       console.error(error.message); 
    }
}