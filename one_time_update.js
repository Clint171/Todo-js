const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const taskSchema = new mongoose.Schema({
    userEmail: String,
    taskTitle: String,
    taskDescription: String,
    taskCreationDate: String,
    taskStatus: String,
});

const Task = mongoose.model("Task", taskSchema , "Task");

mongoose.connect(process.env.MONGO_URL_NET , {
    dbName : "Todo-js"
});

let userEmails = [

];

let tasks = [
];

// save all tasks to the database for each user

userEmails.forEach((email)=>{
    console.log("Adding tasks for user : "+ email);
    tasks.forEach((task)=>{
        task.userEmail = email;
        let newTask = new Task(task);
        newTask.save();
    });
});