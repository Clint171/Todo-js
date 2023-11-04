const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../schemas/user.js");
const Task = require("../schemas/task.js");
const bcrypt = require("bcrypt");

const url = process.env.MONGO_URL;

mongoose.connect(url , {
    dbName : "Todo-js"
});

let saveUser = (user)=>{
    let newUser = new User(user);
    return newUser.save();
}

let saveTask = (task)=>{
    let newTask = new Task(task);
    return newTask.save();
}

let getUser = (email)=>{
    return User.findOne({email: email});
}

let getTasks = (email)=>{
    return Task.find({userEmail : email});
}

let updateEmail = (user , newEmail)=>{
    let dbUser = User.findOne({email : user.email});
    let check = bcrypt.compare(user.password , dbUser.password);
    if(!check){
        return false
    }
    else{
        User.findOneAndUpdate({email : user.email} , {email : newEmail});
    }
}

let updatePassword = (user , newPassword)=>{
    let dbUser = User.findOne({email : user.email});
    let check = bcrypt.compare(user.password , dbUser.password);
    if(!check){
        return false
    }
    else{
        User.findOneAndUpdate({email : user.email} , {password : newPassword});
    }
}

let updateTask = (user , newTask)=>{
    let dbUser = User.findOne({email : user.email});
    let check = bcrypt.compare(user.password , dbUser.password);
    if(!check){
        return false
    }
    else{
        Task.findOneAndUpdate({taskId : newTask.taskId} , newTask);
    }
}

let deleteTask = (user , task)=>{
    let dbUser = User.findOne({email : user.email});
    let check = bcrypt.compare(user.password , dbUser.password);
    if(!check){
        return false
    }
    else{
        Task.findOneAndDelete({taskId : task.taskId} , (error , data)=>{
            if(error){
                return false;
            }
            else{
                return true;
            }
        });
    }
}

exports.saveUser = saveUser;
exports.saveTask = saveTask;
exports.getUser = getUser;
exports.getTasks = getTasks;
exports.updateEmail = updateEmail;
exports.updatePassword = updatePassword;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;