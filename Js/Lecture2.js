// const a=[1,2,3,4,5];
// const b=[...a];
// const obj1={
//     key1:"value1",
//     key2:"value2"
// }
// const obj2={...obj1};
// const a=['HTML','CSS','JS'];
// const b=['C++','JAVA','Python'];
// const c=[...a,...b];
// console.log(c);
// const user={
//     name:"Mohit",
//     email:"mohit@gmail.com",
//     password:"123456789"
// }
// const ans={...user};
// console.log(ans);
// const sum=(...arr)=>{
//     let s=0;
//     for(let i=0;i<arr.length;i++){
//         s+=arr[i];
//     }
//     return s;
// }
// console.log(sum(5,6,5,6,7));
// console.log(sum(5,6,5));

// const arr=[2,3,4,5,6];
// const [a,b,...c]=arr;
// console.log(a,b,c);
// const name="erty";
// const user={
//     name:"Rahul",
//     email:"rahul@gmail.com",
//     password:"12345678",
//     role:"CANDIDATE",
//     address:{
//         city:"Rajpura",
//         state:"Punjab"
//     }
// }
// const {city,state}=user.address;
// const {
//     address:{
//         city,state
//     }
// }=user;
// console.log(city,state)
// const {email,name:userName,password}=user;
// console.log(userName)

// let a=40;
// let b=30;
// [a,b]=[b,a];
// console.log(a,b);

// const user={
//     name:"Rahul",
//     email:"rahul@gmail.com",
//     password:"12345678",
//     role:"CANDIDATE",
    
// }
// console.log(user?.address?.city);
// let name=null;
// console.log(name??"Guest");
const student = {
    id:101,
    name:"Aman",
    age:21,
    course:"MCA",
    marks:[80,90,85],
};
const {name,course}=student;
console.log(name,course);
const {name:studentName}=student;
console.log(studentName);
const {city="Delhi"}=student;
console.log(city);
const [firstMarks,...another]=student.marks;
console.log(firstMarks);
console.log(another);