let data;

fetch(`https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json`)
.then(function (response) {
    return response.json()
})
.then (function(response){
    // // console.log(response);
    // // data = JSON.parse(response);
    // console.log("All students with an average grade higher than 3 - ",gradeHigherThen3(response));
    // console.log("All female student names with an average grade of 5 - ",femaleGradeHigherThan5(response)); 
    // console.log("All male student full names who live in Skopje and are over 18 years old",maleSkopjeAgeOver18(response));
    // console.log("The average grades of all female students over the age of 24 - ",avgFemaleAgeOver24(response));
    console.log(maleNameBAVG2(response));
})

function gradeHigherThen3 (obj){
    tempArr = [];
    obj.map(el => {
        el.averageGrade > 3 ? tempArr.push(el) : "";
    })
    return tempArr;
}

function femaleGradeHigherThan5 (obj){
    tempArr = [];
    obj.map(el => {
        if(el.averageGrade === 5 && el.gender === "Female"){
            tempArr.push(el)
        }
    })
    return tempArr;
}

function maleSkopjeAgeOver18 (obj){
    tempArr = [];
    obj.filter(el => {
        if(el.city === "Skopje" && el.gender === "Male"){
            tempArr.push([el.firstName, el.lastName])
        }
    })
    return tempArr;
}

function avgFemaleAgeOver24 (obj){
    let temp = [];
    sum = 0;

    temp = obj.filter(el => el.gender === "Female" && el.age > 24)
    .map( el => el.averageGrade);
    for (const el of temp) {
        sum+=el;
    }
    return sum/temp.length;
}

function maleNameBAVG2 (obj){
    tempArr = [];
    obj.map(el => {
        if(el.averageGrade > 2 && el.gender === "Male" && [...el.firstName][0] === "B"){
            tempArr.push(el.lastName);
        }
    })
    return tempArr;
}