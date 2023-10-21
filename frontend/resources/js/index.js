import Task from "./task";
import { clearTaskScreen, displayTasks } from "./taskHelper";
import theme from "./theme";

let nav = document.getElementById("navbar");
let navIcon = document.getElementById("navIcon");
let addIcon = document.getElementById("addIcon");
let popupDiv = document.getElementById("popup");
let taskArray = [];
let newTaskForm = document.getElementById("newTaskForm");
let container = document.getElementById("container");

let themeSelector = document.getElementById("theme-selector");
let items = document.querySelectorAll(".item");
let body = document.querySelector("body");
let header = document.getElementById("header");
let screens = document.querySelectorAll(".screen");
let spans = document.querySelectorAll("span");
themeSelector.value = localStorage.getItem("theme");

popupStart();
//localStorage.clear();
if(localStorage.getItem("tasks")){
    taskArray = JSON.parse(localStorage.getItem("tasks"));
}
taskArray.forEach( task =>{
    let date = new Date(task.date);
    let now = new Date();
    if(now.getTimezoneOffset < 0){
        now.setTime( now.getTime() + now.getTimezoneOffset()*60*1000 );
    }
    else{
        now.setTime( now.getTime() - now.getTimezoneOffset()*60*1000 ); 
    }
    if(date.getTime() < now.getTime()){
        if(task.completed == false){
            task.overdue = true;
        }
    }
});

displayAllTasks();

popupEnd();

function displayAllTasks(){

    clearTaskScreen(container);
    displayTasks(taskArray);

}

function displayPendingTasks(){

}
function displayCompletedTasks(){

}
function displayOverdueTasks(){

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

newTaskForm.addEventListener("submit", async (event)=>{
    popupStart();
    event.preventDefault();
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    date = new Date(date);
    if(date.getTimeZoneOffset < 0){
        date.setTime( date.getTime() + date.getTimezoneOffset()*60*1000 );
    }
    else{
        date.setTime( date.getTime() - date.getTimezoneOffset()*60*1000 );
    }
    var task = new Task(taskArray.length , title , description , date);
    taskArray.push(task);
    localStorage.setItem("tasks" , JSON.stringify(taskArray));
    popupEnd();
    location.reload();

});

function popupStart(){

    popupDiv.classList.remove('hidden');

}
function popupEnd(){

    popupDiv.classList.add("hidden");

}


//Everything themes starts here:

if(themeSelector.value == null){
    themeSelector.value = "#1F1F1F";
}

themeSelector.addEventListener("change", function(){
    changeTheme(themeSelector.value);
    localStorage.setItem("theme", themeSelector.value);
});

themeSelector.addEventListener("click", function(){
    changeTheme(themeSelector.value);
    localStorage.setItem("theme", themeSelector.value);
});
