function Person (firstName, lastName, age) {
    this.firstName = firstName,
    this.lastName = lastName,
    this.age = age,
    this.getFullName = function () {
        console.log(this.firstName + this.lastName);
    }
}


function Student (firstName, lastName, age, academyName, studentId) {
    Object.setPrototypeOf(this, new Person(firstName, lastName, age)),

    this.academyName = academyName,
    this.studentId = studentId,
    this.study = function (){
        console.log(`The student ${firstName} is studying in the ${academyName} `);
    }
    this.studentAcademy = function(studetn) {
        console.log(student.academyName);
        return studetn.academyName;
    }
}

let vlatko = new Student ("Vlatko","Jakimovski", 32, "SEDC", 1515);
let irena = new Student ("Irena","Jakimovska", 32, "SEDC", 1313);
// console.log(vlatko);
// console.log(irena);

function DesignStudent (firstName, lastName, age, studentId, academyName, isStudentOfTheMonth ) {
    Object.setPrototypeOf(this, new Student(firstName, lastName, age, academyName, studentId)),
    this.academyName = "design",
    this.isStudentOfTheMonth = isStudentOfTheMonth,
    this.attendAdobeExam = function(){
        console.log(`The student ${this.firstName} is doing an adobe exam!`);
    }
}

function CodeStudent (firstName, lastName, age,  studentId, academyName, hasIndividualProject, hasGroupProject ){
    Object.setPrototypeOf(this, new Student(firstName, lastName, age, academyName, studentId)),
    this.academyName="Code",
    this.hasIndividualProject = hasIndividualProject ,
    this.hasGroupProject = hasGroupProject,
    this.doProject = function (type) {
        if(type === "individual") {
            console.log(`The student ${this.firstName} works on ${type} project`); 
            this.hasIndividualProject = true;
        } else if(type === "group" ) {
            console.log(`The student ${this.firstName} works on ${type} project`)
            this.hasGroupProject = true;
        } else {
            console.log(`Unknown working project`);
        }
    }
}
function NetworkStudent (firstName, lastName, age, academyName, studentId, academyPart){
    Object.setPrototypeOf(this, new Student(firstName, lastName, age, academyName, studentId)),
    this.academyName="Network",
    this.academyPart = academyPart,
    this.attendCiscoExam = function (){
        console.log(`The student ${this.firstName} is doing cisco exam !`);
    }
}


let vlatkoDesign = new DesignStudent("VlatkoDES", "JakimovskiDES", 35, 12345611, "", true);
let vlatkoCode = new CodeStudent("VlatkoCODE", "JakimovskiCODE", 25, 10002, "", "", "");
let vlatkoNetwork = new NetworkStudent("VlatkoNET", "JakimovskiNET", 40,"", 199902, 5 );

// vlatkoCode.doProject("some")
vlatkoCode.doProject("group")


console.log(vlatkoDesign);
console.log(vlatkoCode);
console.log(vlatkoNetwork);