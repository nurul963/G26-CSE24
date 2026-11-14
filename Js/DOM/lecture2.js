// select element by id
/*
const navbar=document.getElementById("navbar");
console.dir(navbar);
*/
//Select element by class
/*
const li=document.getElementsByClassName("nav-items");
console.log(li[2]);
*/
// select element by tags
/*
const li=document.getElementsByTagName("li");
console.log(li);
*/
/*
const navbar=document.querySelector("#navbar")
const li=document.querySelector(".nav-items")
const li2=document.querySelector("li")
const li3=document.querySelectorAll(".nav-items");
console.log(li3[2]);
*/
// const heading=document.getElementsByTagName('h1');
// heading[0].style.backgroundColor="red";
// const box=document.getElementsByClassName("box");
const box=document.createElement('div');
box.style.cssText=`
width: 300px;
height: 300px;
border: 1px solid black;
background-color: brown;
`
const ul=document.getElementById("navbar");
ul.after(box);
const h1=document.createElement('h1');
h1.innerText="Hello and Welcome";
box.after(h1);