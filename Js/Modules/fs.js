const fs=require('fs');
// fs.readFile('message.txt','utf8',(err,data)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(data);
// })
// const read=()=>{
//     try {
//       fs.readFile('message.txt','utf8',(err,data)=>{
//         console.log(data);
//        }); 
//     } catch (error) {
//        console.log(error); 
//     }
// }
// read();
fs.appendFile("message.txt","\n2.Hello and welcome",(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("File written")
})