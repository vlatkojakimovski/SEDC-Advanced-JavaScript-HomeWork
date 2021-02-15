let input = []; 
let result = [];
let finalRes = [];
let validPass = 0;
let validPassTwo = 0;

function readFile(file)
{
    var f = new XMLHttpRequest();
    f.open("GET", file, false);
    f.onreadystatechange = function ()
    {
        if(f.readyState === 4)
        {
            if(f.status === 200 || f.status == 0)
            {
                input =  f.responseText;
                // alert(res); //to see if contents are read
            }
        }
    }
    f.send(null);
}
readFile('input.txt');


// removing newline with blank space
input = input.replace(/\n/g, ' ');

// removing :
input = input.replace(/:/g, '');

// Replace  - with blank space
input = input.replace(/-/g, ' ');

// Split string by " "
result.push(input.split(" "));
console.log(result);
console.log(result[0].length);


//Counting valid passwords
for (let i = 0; i < result[0].length-4; i+=4) {
    let sumAppear = (result[0][i+3].match(new RegExp(result[0][i+2], "g")) || []).length; 
    // if (sumAppear >= result[0][i] && sumAppear <= result[0][i+1]) {
        let tempPass = [...result[0][i+3]];
        if ((tempPass[result[0][i]-1]==result[0][i+2] && tempPass[result[0][i+1]-1]!=result[0][i+2]) ||
            (tempPass[result[0][i]-1]!=result[0][i+2] && tempPass[result[0][i+1]-1]==result[0][i+2])) {
                // console.log(tempPass[result[0][i]]);
                validPassTwo++;
        }
        validPass++;
    // }
}


console.log(validPass);
console.log(validPassTwo);
