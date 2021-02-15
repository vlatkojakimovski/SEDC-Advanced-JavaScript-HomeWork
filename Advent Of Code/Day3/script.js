let result = [];
let treeEncounter = 0;


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
// console.log(input);



// Split string by newline
result.push(input.split("\n"));
console.log(result);

// remove last element because is blank space
for (let i = 0; i < result[0].length; i++) {
    result[0][i] = [...result[0][i] ];
    result[0][i].pop();
}

let iterator = 0;
let rowLength = result[0][0].length-1;

// Part 1 (Hardest way to solve)
for (let i = 1; i < result[0].length; i++) {
    if (iterator+3 >rowLength ) {
        if (rowLength - iterator === 0) {
            iterator = -1;
        } else if (rowLength - iterator === 1) {
            iterator = -2;
        }else if (rowLength - iterator === 2) {
            iterator = -3;
        }
    }
    iterator+=3;
    if (result[0][i][iterator]=='#') {
        treeEncounter++;
        // result[0][i][iterator] = 'X';
    }else{
        // result[0][i][iterator] = 'O';
    }
    
}

console.log(result[0]);
console.log(treeEncounter);


// Part 2 (Easy way to solve )
function slope (x, y) {
    let slopeCount = 0;
    let z= 0;
    for (let i = 0; i < result[0].length; i+=x) {
        if(result[0][i][z%31]=="#"){
            // result[0][i][z%11] = "TREE";
            slopeCount++;

        }
            z+=y;
    }
    return slopeCount;
}
console.log(slope(1,1));
console.log(slope(1,3));
console.log(slope(1,5));
console.log(slope(1,7));
console.log(slope(2,1));
let slopeMultiply = slope(1,1) *slope(1,3)*slope(1,5)*slope(1,7)*slope(2,1);
console.log(`Multiplayed slopes: ${slopeMultiply}`);