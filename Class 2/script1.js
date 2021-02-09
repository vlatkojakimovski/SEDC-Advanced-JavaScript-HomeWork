let list = document.getElementById("list");
let btn = document.getElementById("btn");

let arr = ['Vlatko', 'Goran','Dejan','Sinisa','Stefan'];


btn.addEventListener('click', function(){
   for (const el of arr) {
      list.innerHTML+=`<li> ${el} </li>`;
   }
   
})