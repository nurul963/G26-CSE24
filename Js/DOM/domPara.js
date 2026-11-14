const p=document.createElement('p');
p.innerText="i am learning JS";
document.body.prepend(p);
const btn=document.createElement('button');
btn.innerText="Submit";
btn.style.cssText=`
background-color:blue;
padding:10px;
color:white;
border-radius:5px;
cursor:pointer;
`
document.body.append(btn);