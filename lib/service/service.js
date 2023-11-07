let db = require("../db/db.js");
let bcrypt = require("bcrypt");


let saveUser = (user)=>{
    bcrypt.hash(user.password , 10 , (err , hash)=>{
        if(err){
            console.log(err);
            return "error";
        }
        else{
            user.password = hash;
            db.saveUser(user);
            return "success";
        }
    });
}
exports.saveUser = saveUser;

let saveTask = (task)=>{
    db.saveTask(task);
}
exports.saveTask = saveTask;

let getUser = (email)=>{
    return db.getUser(email);
}
exports.getUser = getUser;

let getTasks = (email)=>{
    return db.getTasks(email);
}
exports.getTasks = getTasks;

let comparePasswords = (password , hash)=>{
    return bcrypt.compare(password , hash);
}
exports.comparePasswords = comparePasswords;

let updateTask = (email , task)=>{
    return db.updateTask(email , task);
}
exports.updateTask = updateTask;

let deleteTask = (email , _id)=>{
    return db.deleteTask(email , _id);
}
exports.deleteTask = deleteTask;