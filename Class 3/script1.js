let button = $("#button");
let academyName = $("#academyName");


$(document).ready(function () {
    button.click(function () {
        $.ajax({
            url: "https://raw.githubusercontent.com/Drakso/AJS2019/master/Class1/students.json",
            method: "GET",
            success: function (response) {
                // console.log("Success");
                // console.log(typeof response);
                // console.log(response);
                let obj = JSON.parse(response);
                console.log(obj.academy);
                academyName.html(obj.academy);
            },
        });
    });
});


let btnSWAPI = document.getElementById("btnSWAPI");
let starWars = document.getElementById("starWars");
let table = document.getElementById("table");

btnSWAPI.addEventListener('click',function(){
    fetch(`https://swapi.dev/api/people/`)
        .then(function (response) {
            return response.json()
        })
        .then (function(response){
            console.log(response);
            starWars.innerHTML += `${response.results[0].name}`;
            table.innerHTML = '';
                table.innerHTML += `<td>Height: ${response.results[0].height} </td>`
                table.innerHTML += `<td>Weight: ${response.results[0].mass} </td>`
                table.innerHTML += `<td>Skin Color: ${response.results[0].skin_color} </td>`
                table.innerHTML += `<td>Hair Color: ${response.results[0].hair_color} </td>`
            // }
            

        })

})
