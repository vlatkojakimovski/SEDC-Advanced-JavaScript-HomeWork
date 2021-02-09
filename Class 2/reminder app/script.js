let title = document.getElementById("title");
let priority = document.getElementById("priority");
let color = document.getElementById("color");
let description = document.getElementById("description");
let tableReminder = document.getElementById("tableReminder");

//Buttons
let btnAdd = document.getElementById("btnAdd");
let btnShowReminders = document.getElementById("btnShowReminders");

//Data
let reminders = [];

// Add event click
btnAdd.addEventListener('click', function(){
   let remind = new NewReminder(
      title.value,
      priority.value,
      color.value,
      description.value
   )
   console.log(remind);
   reminders.push(remind);
   console.log(reminders);
})


// Show reminders
btnShowReminders.addEventListener('click', function () {
   tableReminder.innerHTML =`
      <tr>
         <th>Title</th>
         <th>Priority</th>
         <th>Description</th>
      </tr>
   `;
   for (const el of reminders) {

      let tr = document.createElement('tr');
      tr.innerHTML += `
      <th style="color:${el.color} ;">${el.title}</th>
      <td>${el.priority}</td>
      <td>${el.description}</td>`;
      
      tableReminder.appendChild(tr);
   }
})

// Function constructor 
function NewReminder (title,priority,color,description){
   this.title = title;
   this.priority = priority;
   this.color = color || 'black';
   this.description = description;
}


