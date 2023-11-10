const mongoose = require("mongoose");
const User = require("../schemas/user.js");
const Task = require("../schemas/task.js");
const url = process.env.MONGO_URL;

mongoose.connect(url , {
    dbName : "Todo-js"
});

let success = (data)=>{
    if(data == null || data == undefined) return true;
    else return data;
}
let error = (err)=>{
    if(error == null || err == undefined) return false;
    else return err;
}

let createUser = (user)=>{
    let newUser = new User(user);
    return newUser.save().then(success  ,error);
}

let getUserById  = (id)=>{
    return User.findById(id);
}
exports.getUserById = getUserById;

let getUser = (query)=>{
    return User.findOne(query);
}
exports.getUser = getUser;

let getUsers = (query)=>{
    return User.find(query);
}
exports.getUsers = getUsers;

let updateUserById = (id , fields)=>{
    User.findByIdAndUpdate(id , fields);
}
exports.updateUserById = updateUserById;

let updateuser = (query , fields){
    User.findOneAndUpdate(query , fields);
}
exports.updateUser = updateUser();

let updateUsers = (query , fields)=>{
    //Update multiple documents that fit the query
    
}