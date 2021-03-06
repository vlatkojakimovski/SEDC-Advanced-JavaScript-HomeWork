class Animal {
   constructor(name, type, age, size, isEaten){
      this.name = name,
      this.type = type,
      this.age = age,
      this.size = size  
      this.isEaten = false
   }

   eat(input){
      if(input instanceof Animal){
         if(this.type === "herbivore"){
            console.log(`The animal ${this.name} is herbivore and does not eat other animals`) 
         } else {
            input.isEaten = true;
            console.log(`The animal ${this.name} ate the ${input.name}.`);
            if(input.size >= this.size*2){
               console.log(`The animal ${this.name} tried to eat the ${input.name} but it was too large`);
            }
         }         
      } else {
         console.log(`The animal ${this.name} is eating ${input}`);
      }
   }
}

let animal1 = new Animal("Krokodil","carnivore",5,4);
let animal2 = new Animal("srna","carnivore",5,13);

animal1.eat(animal2);