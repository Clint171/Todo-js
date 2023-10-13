let nav = document.getElementById("navbar");
let navIcon = document.getElementById("navIcon");
let addIcon = document.getElementById("addIcon");
let popupDiv = document.getElementById("popup");
let taskArray = [];
let newTaskForm = document.getElementById("newTaskForm");
let container = document.getElementById("container");

popup();
if(localStorage.getItem("tasks")){
    taskArray = JSON.parse(localStorage.getItem("tasks"));
}
displayTasks();

function displayTasks(){
    hideNav();
    var items = document.getElementsByClassName("item");
    for(i = 0 ; i < items.length ; i++){
    container.removeChild(items[i]);
    }

taskArray.forEach(task => {
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
    pTime.textContent = task.date.split("T")[1];

    container.appendChild(itemDiv);
    itemDiv.appendChild(itemTitle);
    itemDiv.appendChild(p);
    itemTitle.appendChild(titleSpan);
    itemTitle.appendChild(check);
    p.appendChild(pDate);
    p.appendChild(pTime);

});
}

function displayPendingTasks(){
    displayTasks();
    hideNav();
    var items = document.getElementsByClassName("item");
    for(i = 0 ; i < items.length ; i++){
        if(taskArray[i].completed == true)
            container.removeChild(items[i]);
    }
}
function displayCompletedTasks(){
    hideNav();
    displayTasks();
    var items = document.getElementsByClassName("item");
    for(i = 0 ; i < items.length ; i++){
        if(taskArray[i].completed == false)
            container.removeChild(items[i]);
    }
}


function showNav(){
    hideAllScreens();
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

    event.preventDefault();
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var date = document.getElementById("date").value;
    popup();
    var task = new Task(taskArray.length , title , description , date);
    taskArray.push(task);
    localStorage.setItem("tasks" , JSON.stringify(taskArray));
    hideScreen('newTaskScreen');
    displayTasks();
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
    displayTasks();
}