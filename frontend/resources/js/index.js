let nav = document.getElementById("navbar");
let navIcon = document.getElementById("navIcon");
let addIcon = document.getElementById("addIcon");
let popupDiv = document.getElementById("popup");
popupStart();
let taskArray = [];
let user;
let signupForm = document.querySelector("#signupForm");
let loginForm = document.querySelector("#loginForm");
let newTaskForm = document.getElementById("newTaskForm");
let editTaskForm = document.getElementById("editTaskForm");
let container = document.getElementById("container");

let themeSelector = document.getElementById("theme-selector");
let items = document.querySelectorAll(".item");
let body = document.querySelector("body");
let header = document.getElementById("header");
let screens = document.querySelectorAll(".screen");
let spans = document.querySelectorAll("span");
themeSelector.value = localStorage.getItem("theme");

if(localStorage.getItem("email") == null){
    document.querySelector("#signout").remove();
}
else{
    document.querySelector("#loginSpan").remove();
    document.querySelector("#signupSpan").remove();
}

function signout(){
    localStorage.clear();
    location.reload();
}

function getTasks(email , callback){
    //get tasks from server
    fetch(`/tasks/${email}`).then(response => response.json()).then(data => {
        //check if data is empty
        if(data.length == 0){
            return;
        }
        taskArray = data;
        callback();
    });
}

//localStorage.clear();

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
if(localStorage.getItem("email")){
getTasks(localStorage.getItem("email") , displayAllTasks);
}
else{
    tutorial();
}

popupEnd();

function displayAllTasks(){
    if(!localStorage.getItem("email") && screenId != "loginScreen" && screenId != "signupScreen"){
        alert("Please login or signup to continue");
        tutorial();
        return;
    }
    clearTaskScreen();
    hideNav();
    displayTasks(taskArray);
    changeTheme(themeSelector.value);
}

function displayPendingTasks(){
    if(!localStorage.getItem("email") && screenId != "loginScreen" && screenId != "signupScreen"){
        alert("Please login or signup to continue");
        tutorial();
        return;
    }
    clearTaskScreen();
    hideNav();
    displayTasks(returnPendingTasks(taskArray));
}
function displayCompletedTasks(){
    if(!localStorage.getItem("email") && screenId != "loginScreen" && screenId != "signupScreen"){
        alert("Please login or signup to continue");
        tutorial();
        return;
    }
    clearTaskScreen();
    hideNav();
    displayTasks(returnCompletedTasks(taskArray));
}
function displayOverdueTasks(){
    if(!localStorage.getItem("email") && screenId != "loginScreen" && screenId != "signupScreen"){
        alert("Please login or signup to continue");
        tutorial();
        return;
    }
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
    if(!localStorage.getItem("email") && screenId != "loginScreen" && screenId != "signupScreen"){
        alert("Please login or signup to continue");
        tutorial();
        return;
    }
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
function showUpdateWindow(id){
    let updateWindow = document.getElementById("editTaskScreen");
    let item = document.getElementById(id);
    let description = document.getElementById("description"+id);
    let taskId = document.getElementById("editId");
    let title = document.getElementById("editTitle");
    let descriptionEdit = document.getElementById("editDescription");
    let date = document.getElementById("editDate");
    let task = taskArray.find(task => task._id == id);
    taskId.value = task._id;
    title.value = task.taskTitle;
    descriptionEdit.value = task.taskDescription;
    date.value = task.taskCreationDate.split("T")[0];
    updateWindow.classList.remove("hidden");
    description.classList.add("hidden");
    item.removeChild(item.lastChild);
    item.removeChild(item.lastChild);
}

signupForm.addEventListener("submit" , (event)=>{
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let passwordConfirmation = document.querySelector("#confirm").value;
    if(password != passwordConfirmation){
        alert("Password and confirmation do not match. Please try again.");
        signupForm.reset();
    }
    else{
        popupStart();
        let xhr = new XMLHttpRequest();
        let form = new FormData();
        form.append("email" , email);
        form.append("password" , password);
        xhr.open("POST" , "/signup" , true);
        xhr.onload = ()=>{
            if(xhr.responseText == ""){
                alert("Account created successfully!");
                localStorage.setItem("email" , email);
                popupEnd();
                location.reload();
            }
            else{
                alert("Error creating account");
            }
        };
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({"email" : email , "password" : password}));
    }
});

loginForm.addEventListener("submit" , (event)=>{
    event.preventDefault();
    let email = document.querySelector("#loginEmail").value;
    let password = document.querySelector("#loginPassword").value;
    popupStart();
    let xhr = new XMLHttpRequest();
    let form = new FormData();
    form.append("email" , email);
    form.append("password" , password);
    xhr.open("POST" , "/login" , true);
    xhr.onload = ()=>{
        if(xhr.responseText == "success"){
            alert("Logged in successfully!");
            localStorage.setItem("email" , email);
            popupEnd();
            location.reload();
        }
        else{
            alert("Error logging into account: "+ xhr.responseText);
        }
    };
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({"email" : email , "password" : password}));
});


newTaskForm.addEventListener("submit", (event)=>{
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
    var task = new Task(localStorage.getItem("email") , title , description , date);
    let xhr = new XMLHttpRequest();
    xhr.open("POST" , "/tasks" , true);
    xhr.onload = ()=>{
        popupEnd();
        location.reload();
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(task));
});

editTaskForm.addEventListener("submit", (event)=>{
    popupStart();
    event.preventDefault();
    var title = document.getElementById("editTitle").value;
    var description = document.getElementById("editDescription").value;
    let date = document.getElementById("editDate").value;
    date = new Date(date);
    if(date.getTimeZoneOffset < 0){
        date.setTime( date.getTime() + date.getTimezoneOffset()*60*1000 );
    }
    else{
        date.setTime( date.getTime() - date.getTimezoneOffset()*60*1000 );
    }
    var task = new Task(localStorage.getItem("email") , title , description , date);
    task._id = document.getElementById("editId").value;
    let xhr = new XMLHttpRequest();
    xhr.open("PUT" , "/tasks/"+ localStorage.getItem("email") , true);
    xhr.onload = ()=>{
        popupEnd();
        location.reload();
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(task));
});

class Task{
    userEmail;
    taskTitle;
    taskDescription;
    taskCreationDate;
    taskStatus;
    taskOverdue;
    constructor(email , title , description , date) {
        this.userEmail = email;
        this.taskTitle = title;
        this.taskDescription = description;
        this.taskCreationDate = date;
        let now = new Date();
        if(now.getTimezoneOffset < 0){
            now.setTime( now.getTime() + now.getTimezoneOffset()*60*1000 );
        }
        else{
            now.setTime( now.getTime() - now.getTimezoneOffset()*60*1000 );
        }

        if(this.taskCreationDate.getTime() < now.getTime()){
            this.overdue = true;
        }
        else{
            this.overdue = false;
        }
        this.taskStatus = "pending";
    }
}

function popupStart(){
    popupDiv.classList.remove('hidden');
}

function popupEnd(){
    popupDiv.classList.add("hidden");

}

function updateTask(id){
    let task = taskArray.find(task => task._id == id);
    if(task.taskStatus == "pending"){
        task.taskStatus = "completed";
    }
    else{
        task.taskStatus = "pending";
    }
    let xhr = new XMLHttpRequest();
    xhr.open("PUT" , "/tasks/"+ localStorage.getItem("email") , true);
    xhr.onload = ()=>{
        location.reload();
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(task));
}

//Create function to display tasks that takes the array of tasks as a parameter
function displayTasks(tasks){
    if(!localStorage.getItem("email")){
        alert("Please login or signup to continue");
        tutorial();
        return;
    }
    tasks.forEach(task => {
        var itemDiv = document.createElement("div");
        var itemTitle = document.createElement("h2");
        var titleSpan = document.createElement("span");
        var check = document.createElement("input");
        var description = document.createElement("p");
        var p = document.createElement("p");
        var pDate = document.createElement("span");
        var pTime = document.createElement("span");

        let rgb = hexToRgb(themeSelector.value);
        let r = rgb[0];
        let g = rgb[1];
        let b = rgb[2];

        itemDiv.classList.add("item");
        itemDiv.style.backgroundColor = `rgb(${r+30},${g+30},${b+30})`;
        itemTitle.classList.add("item-title");
        check.classList.add("item-check");
        itemDiv.setAttribute("id" , task._id);
        itemDiv.setAttribute("onclick" , `viewTaskDescription("${task._id}")`);
        check.setAttribute("type" , "checkbox");
        check.setAttribute("onclick" , `updateTask("${task._id}")`);
        description.setAttribute("id" , `description${task._id}`);
        if(task.overdue == true){
            if(task.taskStatus == "pending"){
                itemDiv.classList.add("overdue");
            }
        }
        if(task.taskStatus == "completed"){
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
    
        titleSpan.textContent = task.taskTitle;
        description.textContent = task.taskDescription;
        pDate.textContent = task.taskCreationDate.split("T")[0];
        pTime.textContent = task.taskCreationDate.split("T")[1].split(".")[0];
    
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
        if(task.taskStatus == "pending"){
            pendingTasks.push(task);
        }
    });
    return pendingTasks;
}

function returnCompletedTasks(tasks){
    var completedTasks = [];
    tasks.forEach(task => {
        if(task.taskStatus == "completed"){
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

function deleteItem(id){
    let confirm = prompt("Delete this task? Type y for Yes or n for No");
    if(confirm == "y" || confirm == "Y" || confirm == "yes" || confirm == "Yes" || confirm == "YES"){
        popupStart();
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE" , "/tasks/"+ localStorage.getItem("email") , true);
        xhr.onload = ()=>{
            if(xhr.responseText == "" || xhr.responseText == "success"){
                popupEnd();
                location.reload();
            }
            else{
                alert("Error deleting task.");
            }
        }
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({"_id" : id}));
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
        var updateButton = document.createElement("button");
        var deleteButton = document.createElement("button");
        updateButton.textContent = "Update";
        deleteButton.textContent = "Delete";
        updateButton.classList.add("button-cancel");
        deleteButton.classList.add("button-delete");
        updateButton.setAttribute("onclick" , `showUpdateWindow("${id}")`);
        deleteButton.setAttribute("onclick" , `deleteItem("${id}")`);
        item.appendChild(deleteButton);
        item.appendChild(updateButton);
    }
    else{
        description.classList.add("hidden");
        //remove buttons
        item.removeChild(item.lastChild);
        item.removeChild(item.lastChild);
    }
}


//Everything themes starts here:
if(localStorage.getItem("theme")){
    changeTheme(localStorage.getItem("theme"));
    themeSelector.value = localStorage.getItem("theme");
}
else{
    changeTheme("#1F1F1F");
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

//Function for usage tutorial
function tutorial(){
    alert("Welcome to Task Manager! \n\nTo get started, click on the icon  at the top right corner of your screen and \n--Sign up if you're new\n--Log in if you already have an account \n\nYou can view your tasks afterwards by clicking the menu icon in the top right corner. \n\nYou can also change the theme of the app by clicking the color palette icon in the top right corner, right next to the menu icon. \n\nEnjoy!");
}