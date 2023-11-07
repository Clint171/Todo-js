let nav = document.getElementById("navbar");
let navIcon = document.getElementById("navIcon");
let addIcon = document.getElementById("addIcon");
let popupDiv = document.getElementById("popup");
let taskArray = [];
let user;
let signupForm = document.querySelector("#signupForm");
let loginForm = document.querySelector("#loginForm");
let newTaskForm = document.getElementById("newTaskForm");
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
    let email = localStorage.getItem("email");
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


popup();
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

getTasks(localStorage.getItem("email") , displayAllTasks);

function displayAllTasks(){
    clearTaskScreen();
    getTasks(localStorage.getItem("email"));
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

signupForm.addEventListener("submit" , (event)=>{
    event.preventDefault();
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let passwordConfirmation = document.querySelector("#confirm").value;
    alert(password+" : "+passwordConfirmation);
    if(password != passwordConfirmation){
        alert("Password and confirmation do not match. Please try again.");
        signupForm.reset();
    }
    else{
        popup();
        let xhr = new XMLHttpRequest();
        let form = new FormData();
        form.append("email" , email);
        form.append("password" , password);
        xhr.open("POST" , "/signup" , true);
        xhr.onload = ()=>{
            if(xhr.responseText == "success"){
                alert("Account created successfully!");
                localStorage.setItem("email" , email);
                location.reload();
            }
            else{
                alert("Error creating account: "+ xhr.responseText);
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
    popup();
    let xhr = new XMLHttpRequest();
    let form = new FormData();
    form.append("email" , email);
    form.append("password" , password);
    xhr.open("POST" , "/login" , true);
    xhr.onload = ()=>{
        if(xhr.responseText == "success"){
            alert("Logged in successfully!");
            localStorage.setItem("email" , email);
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
    var task = new Task(localStorage.getItem("email") ,taskArray.length , title , description , date);
    let xhr = new XMLHttpRequest();
    xhr.open("POST" , "/tasks" , true);
    xhr.onload = ()=>{
        location.reload();
    }
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(task));
});

class Task{
    userEmail;
    taskId;
    taskTitle;
    taskDescription;
    taskCreationDate;
    taskStatus;
    taskOverdue;
    constructor(email ,id , title , description , date) {
        this.userEmail = email;
        this.taskId = id;
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

function popup(){
    popupDiv.classList.remove('hidden');
    setTimeout(()=>{
        popupDiv.classList.add("hidden");
    }, 1500);
}

function updateTask(id){
    if(taskArray[id].taskStatus == "pending"){
        taskArray[id].taskStatus = "completed";
    }
    else{
        taskArray[id].taskStatus = "pending";
    }
}

function showDescription(id){
    var p = document.createElement("p");
    p.setAttribute("id" , i);
    p.textContent = taskArray[id].taskDescription;
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
        itemDiv.setAttribute("id" , task.taskId);
        itemDiv.setAttribute("onclick" , `viewTaskDescription(${task.taskId})`);
        check.setAttribute("type" , "checkbox");
        check.setAttribute("onclick" , `updateTask(${task.taskId})`);
        description.setAttribute("id" , `description${task.taskId}`);
        if(task.overdue == true){
            if(task.taskStatus == "pending"){
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