const inputEl = document.querySelector("#input");
const buttonEl = document.querySelector("#delete");
const outputEl = document.querySelector("#list-container");
const form = document.querySelector("form");

//add task to local storage
//this is like a built backend for saving data
//cannot use the local storage without wondow


//delete task
const removeTask = (id) =>{
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks = tasks.filter((task)=>{
    return task.id !== +id;
  })
  localStorage.setItem('tasks',JSON.stringify(tasks));
  getTask();

}

//get items
const getTask = () =>{
  let tasks;

  if(localStorage.getItem('tasks')!==null){
    tasks = JSON.parse(localStorage.getItem('tasks')); 
  }
  else{
    tasks = [];
  }
  console.log(tasks);
  //display to dom
  let output;
  const alltasks = tasks.map((task)=>{
    return ` <li id="item">
    <span>${task.title}</span>
    <button onclick="removeTask('${task.id}')" id="delete">X</button>
  </li>`
  })
  output = alltasks.join("");
  console.log(output);
  outputEl.innerHTML = output;
};
getTask();

const addTask = (e) =>{
  e.preventDefault();
  console.log(inputEl.value);
  //check if input is empty, then alert
  if(inputEl.value ==="") alert('Please enter in a task');

  //get the item(what you're trying to save)
  const task = inputEl.value;
  if(task) {
    let tasks;

    if(localStorage.getItem('tasks')===null){
      tasks = [];
      console.log(tasks)
    }
    else{
      tasks = JSON.parse(localStorage.getItem('tasks'));//changes it from json object into javavscript object
      console.log(tasks)
    }
    tasks.unshift({id:Date.now(),title:task});
    localStorage.setItem('tasks',JSON.stringify(tasks));

    //empty input
    inputEl.value = "";
  }
  getTask();
};

//event listener
//the event being listened to is called submit
form.addEventListener("submit", addTask);

