const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../schemas/user.js");
const Task = require("../schemas/task.js");
const url = process.env.MONGO_URL;

mongoose.connect(url , {
    dbName : "Todo-js"
});

let saveUser = (user)=>{
    let newUser = new User(user);
    try{
        newUser.save().then((doc)=>{
            return true;
        });
    }
    catch(err){
        console.log(err);
        return false;
    }
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

let updateTask = (email , newTask)=>{
    return Task.findOneAndUpdate({userEmail : email,_id : newTask._id} , newTask);
}

let deleteTask = (email , _id)=>{
    return Task.findOneAndDelete({userEmail : email,_id : _id});
}

exports.saveUser = saveUser;
exports.saveTask = saveTask;
exports.getUser = getUser;
exports.getTasks = getTasks;
exports.updateEmail = updateEmail;
exports.updatePassword = updatePassword;
exports.updateTask = updateTask;
exports.deleteTask = deleteTask;