let movieName = document.getElementById("movieName");
let btnSearch = document.getElementById("btnSearch");
let response = document.getElementById("response");

let movieArr = ['Movie1','Movie2','Movie3'];

btnSearch.addEventListener('click', function(){
   for (let el of movieArr) {
      // alert(el === movieName.value);
      if(el.toLowerCase() === movieName.value.toLowerCase()){
         console.log(`${el} and ${movieName.value}`);
         response.innerHTML = `The movie ${el} can be rented`;
         response.style.color = 'black';
         break;
      }else {
         response.innerHTML = `The movie ${movieName.value} can't be rented`;
         response.style.color = 'red';
      }
   }
})