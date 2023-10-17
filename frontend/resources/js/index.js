let nav = document.getElementById("navbar");
let navIcon = document.getElementById("navIcon");
let addIcon = document.getElementById("addIcon");
let popupDiv = document.getElementById("popup");
let taskArray = [];
let newTaskForm = document.getElementById("newTaskForm");
let container = document.getElementById("container");

popup();
//localStorage.clear();
if(localStorage.getItem("tasks")){
    taskArray = JSON.parse(localStorage.getItem("tasks"));
}
taskArray.forEach( task =>{
    if(task.date.toDateString > Date.now()){
        if(task.completed == false){
            alert("tasks are overdue");
            task.overdue = true;
        }
    }
});


displayAllTasks();

function displayAllTasks(){
    clearTaskScreen();
    hideNav();
    displayTasks(taskArray);
}

function displayPendingTasks(){
    clearTaskScreen();
    hideNav();
    displayTasks(returnPendingTasks(taskArray));
}
function displayCompletedTasks(){
    clearTaskScreen();
    hideNav();
    displayTasks(returnCompletedTasks(taskArray));
}
function displayOverdueTasks(){
    clearTaskScreen();
    hideNav();
    displayTasks(returnOverdueTasks(taskArray));
}


function showNav(){
    hideAllScreens();
    newTaskForm.reset();
    nav.classList.remove("hidden");
    navIcon.setAttribute("onclick" ,"hideNav()");
    addIcon.classList.add("hidden");
}
function hideNav(){
    nav.classList.add("hidden");
    navIcon.setAttribute("onclick" ,"showNav()");
    addIcon.classList.remove("hidden");
}
function showScreen(screenId){
    hideAllScreens();
    let screen = document.getElementById(screenId);
    screen.classList.remove("hidden");
    hideNav();
    addIcon.classList.add("hidden");

}
function hideScreen(screenId){
    let screen = document.getElementById(screenId);
    screen.classList.add("hidden");
    addIcon.classList.remove("hidden");
}
function hideAllScreens(){
    let screens = document.getElementsByClassName("screen");
    for(let i = 0; i < screens.length; i++){
        let element = screens[i];
        if(element.classList.contains("hidden")){
            continue;
        }
        element.classList.add("hidden");
    }
}

newTaskForm.addEventListener("submit", (event)=>{
    popup();
    event.preventDefault();
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    date = new Date(date);
    var task = new Task(taskArray.length , title , description , date);
    taskArray.push(task);
    localStorage.setItem("tasks" , JSON.stringify(taskArray));
    hideScreen('newTaskScreen');
    displayAllTasks();
    newTaskForm.reset();
});

class Task{
    id;
    title;
    description;
    date;
    completed;
    overdue;
    constructor(id , title , description , date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        if(this.date < Date.now()){
            this.overdue = true;
        }
        else{
            this.overdue = false;
        }
        this.completed = false;
    }
}

function popup(){
    popupDiv.classList.remove('hidden');
    setTimeout(()=>{
        popupDiv.classList.add("hidden");
    }, 1000);
}

function updateTask(id){
    if(taskArray[id].completed == false){
        taskArray[id].completed = true;
    }
    else{
        taskArray[id].completed = false;
    }
    localStorage.setItem("tasks" , JSON.stringify(taskArray));
    displayAllTasks();
}

function showDescription(id){
    var p = document.createElement("p");
    p.setAttribute("id" , i);
    p.textContent = taskArray[id].description;
    p.style.width = "100%";
    document.getElementById(id).appendChild(p);
}

//Create function to display tasks that takes the array of tasks as a parameter
function displayTasks(tasks){

    tasks.forEach(task => {
        var itemDiv = document.createElement("div");
        var itemTitle = document.createElement("h2");
        var titleSpan = document.createElement("span");
        var check = document.createElement("input");
        var p = document.createElement("p");
        var pDate = document.createElement("span");
        var pTime = document.createElement("span");
        itemDiv.classList.add("item");;
        itemTitle.classList.add("item-title");
        check.classList.add("item-check");
        check.setAttribute("type" , "checkbox");
        check.setAttribute("onclick" , `updateTask(${task.id})`);
        if(task.overdue == true){
            if(task.completed == false){
                itemDiv.classList.add("overdue");
            }
        }
        if(task.completed == true){
            itemTitle.classList.add("item-title-completed");
            check.setAttribute("checked" , "");
            check.classList.add("item-check-clicked");
        }
        else{
            check.removeAttribute("checked");
            check.classList.remove("item-check-clicked");
            itemTitle.classList.remove("item-title-completed");
        }
        p.classList.add("item-description");
    
        titleSpan.textContent = task.title;
        pDate.textContent = task.date.split("T")[0];
        pTime.textContent = task.date.split("T")[1].split(".")[0];
    
        container.appendChild(itemDiv);
        itemDiv.appendChild(itemTitle);
        itemDiv.appendChild(p);
        itemTitle.appendChild(titleSpan);
        itemTitle.appendChild(check);
        p.appendChild(pDate);
        p.appendChild(pTime);
    });

}
function returnPendingTasks(tasks){
    var pendingTasks = [];
    tasks.forEach(task => {
        if(task.completed == false){
            pendingTasks.push(task);
        }
    });
    return pendingTasks;
}

function returnCompletedTasks(tasks){
    var completedTasks = [];
    tasks.forEach(task => {
        if(task.completed == true){
            completedTasks.push(task);
        }
    });
    return completedTasks;
}
function returnOverdueTasks(tasks){
    var overdueTasks = [];
    tasks.forEach(task => {
        if(task.overdue == true){
            if(task.completed == false){
                overdueTasks.push(task);
            }
        }
    });
    return overdueTasks;
}

function clearTaskScreen(){
    container.innerHTML = "";
}