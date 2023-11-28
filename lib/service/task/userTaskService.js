const Task = require("../../schemas/task.js");

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
    if(task.parentTask){
        Task.findById(task.parentTask).then(parentTask =>{
            if(parentTask == null){
                res.status(404);
                res.send("Parent task not found");
                return;
            }
            parentTask.subtasks.push(task._id);
            parentTask.save();
            task.save();
            res.send("success");
        });
    }
    else{
        task.parentTask = null;
        task.save();
        res.send("success");
    }
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
    });
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
    });
}
exports.getUserCompletedTasks = getUserCompletedTasks;

let getUserOverdueTasks = (req , res , next)=>{
    Task.find({ownerId : req.user._id , overdue : true}).then(tasks =>{
        res.json(tasks);
    })
}
exports.getUserOverdueTasks = getUserOverdueTasks;

let getUserTaskComments = (req , res , next) =>{
    Task.findById(req.params.taskId).then(task =>{
        if(task == null){
            res.status(404);
            res.send("Task not found");
            return;
        }
        else if(task.ownerId != req.user._id){
            if(task.visibility == "public"){
                res.json(task.comments);
                return;
            }
            else if(task.visibility == "editors"){
                if(task.editors.includes(req.user._id)){
                    res.json(task.comments);
                    return;
                }
            }
            else if(task.visibility == "group"){
                if(req.user.groups.includes(task.groupId)){
                    res.json(task.comments);
                    return;
                }
            
            }
            res.status(403);
            res.send("Not authorized to view comments");
        }
        res.json(task.comments);
    });
}
exports.getUserTaskComments = getUserTaskComments;

let updateUserTask = (req , res , next)=>{
    Task.findById(req.params.taskId).then(task =>{
        if(task == null){
            res.status(404);
            res.send("Task not found");
            return;
        }
        else if(task.ownerId != req.user._id){
            if(task.editors.includes(req.user._id)){
                task.title = req.body.title;
                task.description = req.body.description;
                task.priority = req.body.priority;
                task.dueDate = req.body.dueDate;
                task.visibility = req.body.visibility;
                task.editors = req.body.editors;
                task.editorsCount = task.editors? task.editors.length : 0;
                task.editorsCountString = task.editors? task.editorsCount.toString() : null;
                task.save();
                res.send("success");
                return;
            }
            else{
                res.send("Not authorized to update task");
                return;
            }
        }
        else{
            task.title = req.body.title;
            task.description = req.body.description;
            task.priority = req.body.priority;
            task.dueDate = req.body.dueDate;
            task.visibility = req.body.visibility;
            task.editors = req.body.editors;
            task.editorsCount = task.editors? task.editors.length : 0;
            task.editorsCountString = task.editors? task.editorsCount.toString() : null;
            task.save();
            res.send("success");
            return;
        }
    });
}
exports.updateUserTask = updateUserTask;

let deleteUserTask = (req , res , next)=>{
    Task.findById(req.params.taskId).then(task =>{
        if(task == null){
            res.status(404);
            res.send("Task not found");
            return;
        }
        else if(task.ownerId != req.user._id){
            res.status(403);
            res.send("Not authorized to delete task");
            return;
        }
        else{
            task.deleteOne().then(()=>{
                res.send("success");
            });
        }
    });
}
exports.deleteUserTask = deleteUserTask;