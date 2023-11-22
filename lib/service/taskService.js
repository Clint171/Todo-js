const Task = require("../schemas/task.js");
const db = require("../db/db.js");

let saveUserTask = (req , res , next)=>{
    let task = new Task(req.body);
    /*
        req.body should have parameters:
            editors if any - array of User ids
            editorPermissions if any : String (read , update , delete)
            title : String
            description : String
            priority : String (low , medium , high)
            dueDate : UTC date string
            visibility : String (public , private , editors , group)
            parentTask : String (Task id of parent)
        
        everything else is calculated by server
            ownerId : String
            editorsCount : Integer
            editorsCountString : String
            creationDate : UTC date String
            creationTime : UTC time String
            dueTime : UTC time string
            status : String (initial : pending)
            overdue : Boolean (if dueDate < creationDate : true)
    */
    // Calculate other fields and save the task
    task.ownerId = req.user._id;
    task.editorsCount = task.editors? task.editors.length : 0;
    task.editorsCountString = task.editors? task.editorsCount.toString() : null;
    let date = new Date();
    task.creationDate = date.toUTCString();
    task.creationTime = date.getUTCHours() + ":" +date.getUTCMinutes()+":"+date.getUTCSeconds();
    task.status = "pending";
    let dueDate = new Date(task.dueDate);
    task.dueTime = dueDate.getUTCHours() + ":" + dueDate.getUTCMinutes() + ":" + dueDate.getUTCSeconds();
    if(dueDate.getTime() < date.getTime()){
        task.overdue = true;
    }
    else{
        task.overdue = false;
    }
    
    task.save();
    if(task.parentTask){
        console.log("Task has a parent")
        Task.findById(task.parentTask).then(parentTask =>{
            parentTask.subtasks.push(task._id);
            parentTask.save();
        });
    }
    res.send("success");
}
exports.saveUserTask = saveUserTask;

let getUserTasks = (req ,res , next)=>{
    Task.find({ownerId : req.user._id}).then(tasks =>{
        res.json(tasks);
    });
}
exports.getUserTasks = getUserTasks;

let getUserPendingTasks = (req , res , next)=>{
    Task.find({ownerId : req.user._id , status : "pending"}).then(tasks =>{
        res.json(tasks);
    })
}
exports.getUserPendingTasks = getUserPendingTasks;

let getUserOngoingTasks = (req , res , next)=>{
    Task.find({ownerId : req.user._id , status : "ongoing"}).then(tasks =>{
        res.json(tasks);
    })
}
exports.getUserOngoingTasks = getUserOngoingTasks;

let getUserCompletedTasks = (req , res , next)=>{
    Task.find({ownerId : req.user._id , status : "completed"}).then(tasks =>{
        res.json(tasks);
    })
}
exports.getUserCompletedTasks = getUserCompletedTasks;

let getUserOverdueTasks = (req , res , next)=>{
    Task.find({ownerId : req.user._id , overdue : true}).then(tasks =>{
        res.json(tasks);
    })
}
exports.getUserOverdueTasks = getUserOverdueTasks;

let getUserTaskComments = (req , res , next) =>{
    let comments;
    Task.findById(req.params.taskId).then(task =>{
        res.json(task.comments);
    });
}
exports.getUserTaskComments = getUserTaskComments;