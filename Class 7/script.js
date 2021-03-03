let table = document.getElementById('tableResults');
let nameSearch = document.getElementById('nameSearch');
let emailSearch = document.getElementById('emailSearch');
let phoneSearch = document.getElementById('phoneSearch');
let idCounter = 0;

function makeCall(url, callback) {
    $.ajax({
        url: url,
        success: function(result) {
            callback(result)

            nameSearch.addEventListener("keydown", () => {
                searchName(result);
            });
            emailSearch.addEventListener("keydown", () => {
                searchEmail(result);
            });
            phoneSearch.addEventListener("keydown", () => {
                searchPhone(result);
            });

        },
        error: function(error) {
            console.warn(error)
        }
    })
}

function writeTable (data){
    table.innerHTML = ``;
   data.map( el => table.innerHTML += `
    <tr> 
        <td>${el.name}</td>
        <td>${el.email}</td>
        <td>${el.phone}</td>
    </tr>
   ` )
}

function searchName(data) {
    console.log(`Called searchName`);
    let tempData = data.filter(el => el.name.toLowerCase().
    includes(nameSearch.value.toLowerCase()));
    writeTable(tempData);
    console.log(idCounting(tempData));
}
function searchEmail(data) {
    console.log(`Called searchEmail`);
    let tempData = data.filter(el => el.email.toLowerCase().
    includes(emailSearch.value.toLowerCase()))
    writeTable(tempData);
    console.log(idCounting(tempData));
}
function searchPhone(data) {
    console.log(`Called searchPhone`);
    let tempData = data.filter(el => el.phone.toLowerCase().
    includes(phoneSearch.value.toLowerCase()))
    writeTable(tempData);
    console.log(idCounting(tempData));
}

function idCounting(data){
    idCounter = 0;
    data.forEach(el => {
        idCounter += el.id;
    });
    return idCounter;
}


makeCall('https://jsonplaceholder.typicode.com/users',writeTable);
// console.log(data);

