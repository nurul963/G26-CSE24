import express from 'express';
import { connectDB } from './config/db.js';
import { PORT } from './utils/env.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';
const app=express();
app.use(express.json());
const corsOption={
    origin:"*"
};
app.use(cors(corsOption));
app.use("/api/auth",userRoute);
app.listen(PORT,()=>{
    console.log('server is running on:'+PORT);
    connectDB();
})