const mongoose = require("mongoose");
const User = require("../schemas/user.js");
const dotenv = require("dotenv");
const Task = require("../schemas/task.js");
// const JoinRequest = require("../schemas/joinRequest.js");
// const JoinCode = require("../schemas/joinCode.js");
// const Group = require("../schemas/group.js");
// const Event = require("../schemas/event.js");
// const Comment = require("../schemas/comment.js");
// const Attachment = require("../schemas/attachment.js");

//const Notification = require("../schemas/notification.js");
//const Message = require("../schemas/message.js");

dotenv.config();

const url = process.env.MONGO_URL;

mongoose.connect(url , {
    dbName : "Todo-js"
});

//CRUD for users

let createUser = (user)=>{
    try{
        let newUser = new User(user);
        newUser.save();
    }
    catch(err){
        return err;
    }
}
exports.createUser = createUser;

let getUserById  = (id)=>{
    try{
        return User.findById(id);
    }
    catch(err){
        return err;
    }
}
exports.getUserById = getUserById;

let getUser = (query)=>{
    try{
        return User.findOne(query);
    }
    catch(err){
        return err;
    }
    
}
exports.getUser = getUser;

let getUsers = (query)=>{
    try{
        return User.find(query);
    }
    catch(err){
        return err;
    }
    
}
exports.getUsers = getUsers;

let updateUserById = (id , fields)=>{
    try{
        User.findByIdAndUpdate(id , fields);
    }
    catch(err){
        return err;
    }
}
exports.updateUserById = updateUserById;

let updateUser = (query , fields)=>{
    try{
        User.findOneAndUpdate(query , fields).then(success , error);
    }
    catch(err){
        return err;
    }
}
exports.updateUser = updateUser;

let updateUsers = (query , fields)=>{
    try{
        let users = User.find(query);
        users.forEach((user)=>{
            user = Object.assign(user , fields);
            user.save();
        });
    }
    catch(err){
        return err;
    }
    
}
exports.updateUsers = updateUsers;

let deleteUserById = (id)=>{
    try{
        User.findByIdAndDelete(id).then(success , error);
    }
    catch(err){
        return err;
    }
}
exports.deleteUserById = deleteUserById;

let deleteUser = (query)=>{
    try{
        User.findOneAndDelete(query).then(success , error);
    }
    catch(err){
        return err;
    }
}
exports.deleteUser = deleteUser;

let deleteUsers = (query)=>{
    try{
        let users = User.find(query);
        users.forEach((user)=>{
        user.delete();
    });
    }
    catch(err){
        return err;
    }
}
exports.deleteUsers = deleteUsers;

//tasks
let createTask = (task)=>{
    try{
        let newTask = new Task(task);
        newTask.save();
    }
    catch(err){
        return err;
    }
}
exports.createTask = createTask;

let getTaskById = (id)=>{
    try{
        return Task.findById(id);
    }
    catch(err){
        return err;
    }
}
exports.getTaskById = getTaskById;

let getTask = (query)=>{
    try{
        return Task.findOne(query);
    }
    catch(err){
        return err;
    }
}
exports.getTask = getTask;

let getTasks = (query)=>{
    try{
        return Task.find(query);
    }
    catch(err){
        return err;
    }
}
exports.getTasks = getTasks;

let updateTaskById = (id , fields)=>{
    try{
        Task.findByIdAndUpdate(id , fields);
    }
    catch(err){
        return err;
    }
}

let updateTask = (query , fields)=>{
    try {
        Task.findOneAndUpdate(query , fields);
    }
    catch (err) {
        return err;
    }
}
exports.updateTask = updateTask;

let updateTasks = (query , fields)=>{
    try{
        let tasks = Task.find(query);
        tasks.forEach((task)=>{
            task = Object.assign(task , fields);
            task.save();
        });
    }
    catch(err){
        return err;
    }
    
}
exports.updateTasks = updateTasks;

let deleteTaskById = (id)=>{
    try {
        Task.findByIdAndDelete(id);
    } 
    catch (err) {
        return err;
    }
}
exports.deleteTaskById = deleteTaskById;

let deleteTask = (query)=>{
    try{
        Task.findOneAndDelete(query);
    }
    catch(err){
        return err;
    }
}
exports.deleteTask = deleteTask;

let deleteTasks = (query)=>{
    try{
        let tasks = Task.find(query);
        tasks.forEach(task=>{
            task.delete();
        });
    }
    catch(err){
        return err;
    }
}
exports.deleteTasks = deleteTasks;