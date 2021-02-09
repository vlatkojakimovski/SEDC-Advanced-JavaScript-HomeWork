let color = document.getElementById("color");
let fontSize = document.getElementById("fontSize");
let text = document.getElementById("text");
let btnGenTitle = document.getElementById("btnGenTitle");
let list = document.getElementById("list");

btnGenTitle.addEventListener('click',function(){
   list.innerHTML+=`<h1 style="color:${color.value} ;font-size: ${fontSize.value}; ">${text.value}</h1>`;
   // list.appendChild( `<h1 style="color:${color.value} ; ">${text.value}</h1>`);
})