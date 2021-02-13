
let number = document.getElementById("number");
let resultInWords = document.getElementById("resultInWords");
let btnConvert = document.getElementById("btnConvert");


let highNumbers = [``,`една`,`две`,`три`,`четири`,`пет`,`шест`,`седум`,`осум`,`девет`,`десет`,
                `единаесет`,`дванаесет`, `тринаесет`, `четиринаесет`, `петнаесет`, `шеснаесет`, `седумнаесет`, `осумнаесет`, `деветнаесет`];
let data1to19 = [``,`еден`,`два`,`три`,`четири`,`пет`,`шест`,`седум`,`осум`,`девет`,`десет`,
                `единаесет`,`дванаесет`, `тринаесет`, `четиринаесет`, `петнаесет`, `шеснаесет`, `седумнаесет`, `осумнаесет`, `деветнаесет`];
let dataDesetki = [``,``,`дваесет`, `триесет`, `четириесет`, `педесет`, `шеесет`, `седумдесет`, `осумдесет`, `деведесет`];
let dataStotki = [``,`сто`,`двесте`,`триста`,`четиристотини`,`петстотини`,`шестотини`,`седумстотини`,`осумстотини`,`деветстотини`];
let position = [[`сто`,`стотини`],[`илјада`,`илјади`],[`милион`,`милиони`],[`милијарда`,`милијарди`]];

let broj ='';
let finalResult = '';
let splitted = '';

btnConvert.addEventListener('click', function() {
    resultInWords.innerText='';
    finalResult ='';

    broj = number.value;
    // Split into subarrays of 3 elements (12569 = [12],[569])
    splitted = broj.split( /(?=(?:...)*$)/);

    numberToWords();
    resultInWords.innerText = finalResult; 
})



// Calculate 2 digit numbers
function lastTwoDigits(numb, arr){
    let pomNum = [...numb.toString()];
    let resultTemp = ``;
    if(numb.length>1){
        alert(`You send number with more then 2 digits !!! = ${numb}`)
    } else {
    if(numb <=19){
        resultTemp +=` ${arr[numb]}`;
    } else if (numb%10==`0`)
    {
        resultTemp += `${dataDesetki[pomNum[0]]} `; 
    } else {
        resultTemp += `${dataDesetki[pomNum[0]]} и ${arr[pomNum[1]]} `; 
    }
    }
    return resultTemp;
}


// Calculate Third digit and send last 2 to function that calculate 2 digit numbers
function digitThree(numb, arr) {
    let pomNum = [...numb];
    let resultTemp = ``;
    if (numb > 99) {
        resultTemp += dataStotki[pomNum[0]];
        if (numb % 100 == 0) {
            return resultTemp;
        } else if (numb % 100 <= 19 || numb % 10 == 0) {
            console.log(`In second IF (numb%100 <= 19)  ||  numb%10 == 0 `);
            return (resultTemp += ` и ${lastTwoDigits(numb % 100, arr)} `);
        } else {
            return (resultTemp += ` ${lastTwoDigits(numb % 100, arr)} `);
        }
    } else {
        return lastTwoDigits(numb % 100, arr);
    }
}

// Check if it's need to add "и" and return the specific index location
function checkAdd(arr) {
    let index = 0;
    if (arr.length > 1) {
        for (let i = 1; i < arr.length; i++) {
            if (splitted[i] != 0 && splitted[i] % 100 == 0) {
                index = i;
            } else if (arr[i] % 100 <= 19 || arr[i] % 10 == 0) {
                splitted[i] <100 ?  index = i : '';
            } 
        }
        return index;
    }
}

// Concerting Numbers to Words
function numberToWords() {
    let additionIndex = checkAdd(splitted);

    let pom = splitted.length;
    
    for (let i = 0; i < splitted.length; i++) {
        if (i == additionIndex && additionIndex != 0) {
            finalResult += " и ";
        }
        if (splitted[i] != 0) {
            if (pom == 1) {
                finalResult += digitThree(splitted[i], data1to19);
                pom--;
            } else {
                pom % 2 != 0
                    ? (finalResult += `${
                          splitted[i] == 1
                              ? ""
                              : digitThree(splitted[i], data1to19)
                      } ${
                          splitted[i] == 1
                              ? position[pom - 1][0]
                              : position[pom - 1][1]
                      } `)
                    : (finalResult += `${
                          splitted[i] == 1
                              ? ""
                              : digitThree(splitted[i], highNumbers)
                      } ${
                          splitted[i] == 1
                              ? position[pom - 1][0]
                              : position[pom - 1][1]
                      } `);
                pom--;
            }
        } else {
            pom--;
        }
    }
    console.log(finalResult);
}