let input = [];
let arrString = [];
let arrInt = [];
    
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

console.log(input);

let result = input.replace(/\r?\n|\r/g, ",");
console.log(result);

arrString= result.split(',');
console.log(arrString);


for (const el of arrString) {
  arrInt.push(parseInt(el));
}

console.log(arrInt);


for (let i = 0; i < arrInt.length; i++) {
  for (let j = i+1; j < arrInt.length; j++) {
    for (let k = j+1; k < arrInt.length;k++) {
      if (arrInt[i]+arrInt[j]+arrInt[k] == 2020) {
        alert("2020");
        console.log(arrInt[i]*arrInt[j]*arrInt[k]);  
    }
    }
    
  }
}