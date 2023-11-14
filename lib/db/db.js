const mongoose = require("mongoose");
const User = require("../schemas/user.js");
const dotenv = require("dotenv");
// const Task = require("../schemas/task.js");
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

let success = (data)=>{
    if(data == null || data == undefined) return true;
    else return data;
}
let error = (err)=>{
    if(error == null || err == undefined) return false;
    else return err;
}

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
    User.findByIdAndUpdate(id , fields).then(success , error);
}
exports.updateUserById = updateUserById;

let updateUser = (query , fields)=>{
    User.findOneAndUpdate(query , fields).then(success , error);
}
exports.updateUser = updateUser;

let updateUsers = (query , fields)=>{
    let users = User.find(query);
    users.forEach((user)=>{
        user = Object.assign(user , fields);
        user.save();
    });
}
exports.updateUsers = updateUsers;

let deleteUserById = (id)=>{
    User.findByIdAndDelete(id).then(success , error);
}
exports.deleteUserById = deleteUserById;

let deleteUser = (query)=>{
    User.findOneAndDelete(query).then(success , error);
}
exports.deleteUser = deleteUser;

let deleteUsers = (query)=>{
    let users = User.find(query);
    users.forEach((user)=>{
        user.delete();
    });
}
exports.deleteUsers = deleteUsers;