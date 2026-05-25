let taskList = document.getElementById("taskList");
let taskStats = document.getElementById("taskStats");

window.onload = function(){

let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

savedTasks.forEach(function(task){
createTask(task.text,task.completed);
});

updateStats();

};

function addTask(){

const input = document.getElementById("taskInput");
const priority = document.getElementById("priority").value;
const date = document.getElementById("dueDate").value;
const category = document.getElementById("category").value;

let text = input.value.trim();

if(text==="") return;

let taskText = text + " ("+priority+") ["+category+"] "+date;

createTask(taskText,false);

updateStorage();
updateStats();

input.value="";

}

document.getElementById("taskInput").addEventListener("keypress",function(e){

if(e.key==="Enter"){
addTask();
}

});

const createTask = (text, completed) => {

let li = document.createElement("li");

const span = document.createElement("span");
span.innerText = text;

// reusable functions
setPriorityClass(span, text);
setOverdueStyle(span, text);

if(completed){
span.classList.add("completed");
}

span.onclick = function(){
span.classList.toggle("completed");
updateStorage();
updateStats();
};

// EDIT BUTTON
let editBtn = document.createElement("button");
editBtn.innerText = "Edit";
editBtn.classList.add("edit-btn");

editBtn.onclick = function(){

let newText = prompt("Edit Task", span.innerText);

if(newText !== null && newText.trim() !== ""){
span.innerText = newText;

// IMPORTANT FIX // REUSABLE FUNCTIONS //
setPriorityClass(span, newText);
setOverdueStyle(span, newText);

updateStorage();
updateStats();
}

};

// DELETE BUTTON
let deleteBtn = document.createElement("button");
deleteBtn.innerText = "Delete";
deleteBtn.classList.add("delete-btn");

deleteBtn.onclick = function(){
li.remove();
updateStorage();
updateStats();
};

li.appendChild(editBtn);
li.appendChild(span);
li.appendChild(deleteBtn);

taskList.appendChild(li);

};

function updateStorage(){

let tasks=[];

let allLi=document.querySelectorAll("#taskList li");

allLi.forEach(function(li){

let span=li.querySelector("span");

tasks.push({
  text: span.innerText,
  completed: span.classList.contains("completed"),
  priority: getPriority(span.innerText),
  date: getDate(span.innerText),
  category: getCategory(span.innerText)
});

});

localStorage.setItem("tasks",JSON.stringify(tasks));

}

function updateStats(){

let total=document.querySelectorAll("#taskList li").length;
let completed=document.querySelectorAll(".completed").length;

taskStats.innerText="Total: "+total+" | Completed: "+completed;

let percent = 0;

if(total>0){
percent = (completed/total)*100;
}

document.getElementById("progress").style.width = percent+"%";

}

function clearAll(){

taskList.innerHTML="";
localStorage.removeItem("tasks");
updateStats();

}

function clearCompleted(){

let completedTasks=document.querySelectorAll(".completed");

completedTasks.forEach(function(task){
task.parentElement.remove();
});

updateStorage();
updateStats();

}

function filterTasks(type){

let tasks=document.querySelectorAll("#taskList li");

tasks.forEach(function(li){

let span=li.querySelector("span");

if(type==="all"){
li.style.display="flex";
}

if(type==="completed"){
li.style.display=span.classList.contains("completed")?"flex":"none";
}

if(type==="pending"){
li.style.display=!span.classList.contains("completed")?"flex":"none";
}

});

}

function sortByPriority(){

  let items = [...document.querySelectorAll("#taskList li")];

  let order = { "High": 1, "Medium": 2, "Low": 3 };

  items.sort((a, b) => {

    let textA = a.innerText;
    let textB = b.innerText;

    let pA = Object.keys(order).find(p => textA.includes(p));
    let pB = Object.keys(order).find(p => textB.includes(p));

    return order[pA] - order[pB];

  });

  items.forEach(item => taskList.appendChild(item));

}

function setPriorityClass(span, text){

  span.classList.remove("priority-high","priority-medium","priority-low");

  if(text.includes("(High)")){
    span.classList.add("priority-high");
  }

  else if(text.includes("(Medium)")){
    span.classList.add("priority-medium");
  }

  else if(text.includes("(Low)")){
    span.classList.add("priority-low");
  }

}

function setOverdueStyle(span, text){

let match = text.match(/\d{4}-\d{2}-\d{2}/);

if(match){

let today = new Date().setHours(0,0,0,0);
let dueDate = new Date(match[0]).setHours(0,0,0,0);

if(dueDate < today){
span.style.background="#ffe6e6";
span.style.color="red";
}

}

}

function getData(){

fetch("https://jsonplaceholder.typicode.com/todos/1")
.then(function(response){
return response.json();
})
.then(function(data){
console.log(data);
})
.catch(function(error){
console.log("Error:", error);
});

}

async function getData(){
  try{
    let response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    let data = await response.json();
    console.log(data);
  }catch(error){
    console.log("Error:", error);
  }
}

async function loadSampleTask(){

try{

let response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

let data = await response.json();

console.log(data); // IMPORTANT (for testing)

createTask(data.title,false);

updateStorage();
updateStats();

}catch(error){

console.log("Error:", error);

}

}

function debounce(fn, delay){
  let timer;
  return function(){
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, arguments), delay);
  };
}

document.getElementById("searchInput").addEventListener("input", function () {

  let value = this.value.toLowerCase();

  document.querySelectorAll("#taskList li").forEach(li => {

    let text = li.innerText.toLowerCase();

    li.style.display = text.includes(value) ? "flex" : "none";

  });

});

let searchBox = document.getElementById("searchInput");

searchBox.addEventListener("input", debounce(function(){

  let value = this.value.toLowerCase();

  document.querySelectorAll("#taskList li").forEach(li => {

    let text = li.innerText.toLowerCase();

    li.style.display = text.includes(value) ? "flex" : "none";

  });

}, 300));

function throttle(func, limit){

let lastCall = 0;

return function(){

let now = new Date().getTime();

if(now - lastCall >= limit){

lastCall = now;

func.apply(this, arguments);

}

};

}

window.addEventListener("scroll", throttle(function(){

console.log("Scrolling...");

}, 1000));

console.log("JS Working");

function checkEmpty(){

  if(taskList.children.length === 0){
    taskList.innerHTML = "<p>No Tasks Available</p>";
  }

}

function checkEmpty(){

  if(taskList.children.length === 0){
    taskList.innerHTML = "<p>No Tasks Available</p>";
  }

}

 