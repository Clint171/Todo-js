let tasks = [];

class Task{
    user;
    tasks;
    constructor(user,tasks){
        this.user = user;
        this.tasks = tasks;
    }
}

let addTasks = (task)=>{
    tasks.push(task);
}

let findTasks = (user)=>{
    let userTasks = [];
    for(let i = 0 ; i < tasks.length ; i++){
        if(tasks[i].user == user){
            userTasks.push(tasks[i]);
        }
    }
    return userTasks;
}

exports.Task = Task;

exports.findTasks = findTasks;

exports.addTasks = addTasks;