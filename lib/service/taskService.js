let saveUserTask = (req , res , next)=>{
    let task = req.body;
    /*
        req.body should have parameters:
            editors if any - array of User ids
            editorPermissions if any : String (read , update , delete)
            title : String
            description : String
            priority : String (low , medium , high)
            dueDate : UTC date string
            dueTime : UTC time string
            visibility : String (public , private , editors , group)
            parentTask : String (Task id of parent)
        
        everything else is calculated by server
            ownerId : String
            editorsCount : Integer
            editorsCountString : String
            creationDate : UTC date String
            creationTime : UTC time String
            status : String (initial : pending)
            overdue : Boolean (if dueDate < creationDate : true)
    */
    // Calculate other fields and save the task
    task.ownerId = req.user._id;
    task.editorsCount = task.editors? task.editors.length : 0;
    task.editorsCountString = task.editors? task.editorsCount.toString() : null;
    let date = new Date();
    task.creationDate = date.toUTCString;
    task.creationTime = date.getUTCHours() +":"+date.getUTCMinutes()+":"+date.getUTCSeconds();
    task.status = "pending";
    let dueDate = new Date(task.dueDate);
    if(dueDate.getTime() < date.getTime()){
        task.overdue = true;
    }
    else{
        task.overdue = false;
    }
}