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

function deleteItem(array , id , next){
    let confirm = prompt("Delete this task? Type y for Yes or n for No");
    if(confirm == "y" || confirm == "Y" || confirm == "yes" || confirm == "Yes" || confirm == "YES"){
        popup();
        array.splice(id , 1);
        //UPDATE THE TASK IDS TO MATCH INDEXES
        for(let i = 0; i < array.length; i++){
            array[i].id = i;
        }
        localStorage.setItem("tasks" , JSON.stringify(taskArray));
        next();
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

function clearTaskScreen(container){
    container.innerHTML = "";
}

function search(input , taskArray){
    var filteredTasks = [];
    taskArray.forEach(task => {
        if(task.title.includes(input)){
            filteredTasks.push(task);
        }
    });
    clearTaskScreen();
    displayTasks(filteredTasks);
}

function updateTask(id , taskArray , next){
    if(taskArray[id].completed == false){
        taskArray[id].completed = true;
    }
    else{
        taskArray[id].completed = false;
    }
    localStorage.setItem("tasks" , JSON.stringify(taskArray));
    next();
}

const _displayTasks = displayTasks;
const _deleteItem = deleteItem;
const _viewTaskDescription = viewTaskDescription;
const _returnPendingTasks = returnPendingTasks;
const _returnCompletedTasks = returnCompletedTasks;
const _returnOverdueTasks = returnOverdueTasks;
const _clearTaskScreen = clearTaskScreen;
const _search = search;
const _updateTask = updateTask;

export {_displayTasks as displayTasks};
export {_deleteItem as deleteItem};
export {_viewTaskDescription as viewTaskDescription};
export {_returnPendingTasks as returnPendingTasks};
export {_returnCompletedTasks as returnCompletedTasks};
export {_returnOverdueTasks as returnOverdueTasks};
export {_clearTaskScreen as clearTaskScreen};
export {_search as search};
export {_updateTask as updateTask};