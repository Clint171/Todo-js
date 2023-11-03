const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    userEmail : String,
    taskId : String,
    taskTitle : String,
    taskDescription : String,
    taskCreationDate : String,
    taskStatus : String,
    taskOverdue : Boolean,
});

module.exports = mongoose.model("Task", taskSchema , "Task");