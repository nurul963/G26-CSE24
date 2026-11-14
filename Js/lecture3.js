// const arr=[10,20,30,40,50];

// arr.forEach((value)=>console.log(value));
// const cars=['ABC','XYZ','DEF','GHI','JKL'];
// cars.forEach((car)=>{
//     console.log(car);
//     // return "Hello" nahi likhna h;
// });
// // forEach returns undefined
// console.log(ans);
// const arr=[10,20,30,40,50,21,31,15];
// const double=arr.map((value)=>value*value);
// console.log(double);

// const products=[
//     {title:"Mobile",price:11000},
//     {title:"Laptop",price:32000},
//     {title:"Charger",price:2200},
//     {title:"Earphone",price:5400}
// ]
// const finalProduct=products.map((product)=>{
//     return {
//         ...product,
//         price:product.price+50
//     }
// });
// console.log(finalProduct);
// const celsius=[0,20,30,40,100];
// const farenhite=celsius.map((c)=>(c*(9/5))+32);
// console.log(farenhite)
const products = [
    {name:"Laptop",price:50000},
    {name:"Phone",price:30000},
    {name:"Mouse",price:1000}
];
const finalProduct=products.map((product)=>{
    return {
        ...product,
        gst:product.price*0.18,
        inStock:true
    }
});
console.log(finalProduct);