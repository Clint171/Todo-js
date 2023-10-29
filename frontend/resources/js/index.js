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

if(localStorage.getItem("user") == null){
    alert("No user found");
    let loginSpan = document.createElement("span");
    let signupSpan = document.createElement("span");
    loginSpan.setAttribute("onclick" , "showScreen('loginScreen')");
    signupSpan.setAttribute("onclick" , "showScreen('signupScreen')");
    loginSpan.textContent = "Login";
    signupSpan.textContent = "Signup";
    nav.prepend(loginSpan);
    nav.prepend(signupSpan);

}

popup();
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

function displayAllTasks(){
    clearTaskScreen();
    hideNav();
    displayTasks(taskArray);
    changeTheme(themeSelector.value);
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

newTaskForm.addEventListener("submit", async (event)=>{
    popup();
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
    location.reload();

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
        let now = new Date();
        if(now.getTimezoneOffset < 0){
            now.setTime( now.getTime() + now.getTimezoneOffset()*60*1000 );
        }
        else{
            now.setTime( now.getTime() - now.getTimezoneOffset()*60*1000 );
        }

        if(this.date.getTime() < now.getTime()){
            this.overdue = true;
        }
        else{
            this.overdue = false;
        }
        this.completed = false;
    }
}
class User{
    email;
    password;
    constructor(email , password){
        this.email = email;
        this.password = password;
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
        var description = document.createElement("p");
        var p = document.createElement("p");
        var pDate = document.createElement("span");
        var pTime = document.createElement("span");
        itemDiv.classList.add("item");;
        itemTitle.classList.add("item-title");
        check.classList.add("item-check");
        itemDiv.setAttribute("id" , task.id);
        itemDiv.setAttribute("onclick" , `viewTaskDescription(${task.id})`);
        check.setAttribute("type" , "checkbox");
        check.setAttribute("onclick" , `updateTask(${task.id})`);
        description.setAttribute("id" , `description${task.id}`);
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
        description.classList.add("item-description");
        description.classList.add("hidden");
        p.classList.add("item-description");
    
        titleSpan.textContent = task.title;
        description.textContent = task.description;
        pDate.textContent = task.date.split("T")[0];
        pTime.textContent = task.date.split("T")[1].split(".")[0];
    
        container.appendChild(itemDiv);
        itemDiv.appendChild(itemTitle);
        itemDiv.appendChild(description);
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

function search(){
    var input = document.getElementById("searchInput").value;
    var filteredTasks = [];
    taskArray.forEach(task => {
        if(task.title.includes(input)){
            filteredTasks.push(task);
        }
    });
    clearTaskScreen();
    displayTasks(filteredTasks);
}
function deleteItem(array , id){
    let confirm = prompt("Delete this task? Type y for Yes or n for No");
    if(confirm == "y" || confirm == "Y" || confirm == "yes" || confirm == "Yes" || confirm == "YES"){
        popup();
        array.splice(id , 1);
        //UPDATE THE TASK IDS TO MATCH INDEXES
        for(let i = 0; i < array.length; i++){
            array[i].id = i;
        }
        localStorage.setItem("tasks" , JSON.stringify(taskArray));
        displayAllTasks();
    }
    else{
        return;
    }
}
function viewTaskDescription(id){
    let description = document.getElementById("description"+id);
    let item = document.getElementById(id);
    if(description.classList.contains("hidden")){
        description.classList.remove("hidden");
        var cancelButton = document.createElement("button");
        var deleteButton = document.createElement("button");
        cancelButton.textContent = "Cancel";
        deleteButton.textContent = "Delete";
        cancelButton.classList.add("button-cancel");
        deleteButton.classList.add("button-delete");
        cancelButton.setAttribute("onclick" , "viewTaskDescription()");
        deleteButton.setAttribute("onclick" , `deleteItem(taskArray , ${id})`);
        item.appendChild(cancelButton);
        item.appendChild(deleteButton);
    }
    else{
        description.classList.add("hidden");
        //remove buttons
        item.removeChild(item.lastChild);
        item.removeChild(item.lastChild);
    }
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

function changeTheme(themeColor){
    header.style.backgroundColor = themeColor;
    body.style.backgroundColor = themeColor;
    popupDiv.style.backgroundColor = themeColor;
    nav.style.backgroundColor = themeColor;

    let rgb = hexToRgb(themeColor);
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];

    for(let i = 0; i < screens.length; i++){
        screens[i].style.backgroundColor = themeColor;
    }

    for(let i = 0; i < spans.length; i++){
        spans[i].style.backgroundColor = `rgb(${r+50},${g+50},${b+50})`;
    }

    for(let i = 0; i < items.length; i++){
        items[i].style.backgroundColor = `rgb(${r+30},${g+30},${b+30})`;
    }

    //Check if rgb values are below 128
    if(r < 100 && g < 100 && b < 100){
        //Change text color to white
        body.style.color = "#FFFFFF";
        document.querySelector("path").style.fill = "#FFFFFF";
        themeSelector.style.backgroundColor = "#FFFFFF";
    }

    else{
        //Change text color to black
        body.style.color = "#000000";
        document.querySelector("path").style.fill = "#000000";
        themeSelector.style.backgroundColor = "#000000";
    }

}
function hexToRgb(hex) {
    // Convert the hex value to an RGB tuple.
    const rgb = [];
    hex = hex.replace("#", "");
    for (let i = 0; i < 3; i++) {
      rgb.push(parseInt(hex.substring(i * 2, i * 2 + 2), 16));
    }
    return rgb;
}