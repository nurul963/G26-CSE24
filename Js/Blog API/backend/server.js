import express from 'express';
const app=express();
app.get("/",(req,resp)=>{
    resp.status(500).json({
       message:"Api is working...",
       statusCode:200 
    })
})
app.listen(8080,()=>{
    console.log(`http://localhost:8080`);
})