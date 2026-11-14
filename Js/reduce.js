

/*const arr=[10,20,30,40];
let mx=-Infinity;
for(let i=0;i<arr.length;i++){
    if(mx<arr[i])
        mx=arr[i];
}
const maxvalue=arr.reduce(function(acc,val,index,arr){
    if(acc<val)
        acc=val;
    return acc;
},-Infinity);
// console.log(maxvalue);

const products=[
    {title:"Mobile",price:3400},
    {title:"Laptop",price:54000},
    {title:"Charger",price:400},
    {title:"Ear phone",price:5400},
    {title:"XYZ",price:3490},
]
const totalAmount=products.reduce((acc,product)=>{
    acc.total=acc.total+product.price;
    return acc;
},{
    total:0,
    gst:0
});
totalAmount.gst=totalAmount.total*1.18;
// console.log(totalAmount);
const totalAmount=products
.reduce((acc,product)=>acc.total+product.price,{
    total:0,
    gst:0
});
*/
const employees = [
    { name: "Aman", dept: "IT" },
    { name: "Riya", dept: "HR" },
    { name: "Rahul", dept: "IT" },
    { name: "Neha", dept: "Sales" },
    { name: "Ankit", dept: "HR" }
];

const EByD=employees.reduce((acc,employee)=>{
    if(!acc[employee.dept]){
        acc[employee.dept]=[];
    }
    acc[employee.dept].push(employee);
    return acc;
},{})
// console.log(EByD);
const students = [
    { name: "Aman", marks: 35 },
    { name: "Riya", marks: 75 },
    { name: "Rahul", marks: 60 },
    { name: "Neha", marks: 90 },
    { name: "Ankit", marks: 28 }
];
const sum=students.filter((student)=>student.marks>=40)
                    .map((student)=>{
                        return {
                            ...student,
                            marks:student.marks+5
                        }
                    })
                    .reduce((acc,student)=>{
                        return acc+student.marks
                    },0)
console.log(sum);