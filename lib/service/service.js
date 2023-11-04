let db = require("../db/db.js");
let bcrypt = require("bcrypt");


let saveUser = (user)=>{
    bcrypt.hash(user.password , 10 , (err , hash)=>{
        if(err){
            console.log(err);
        }
        else{
            user.password = hash;
            db.saveUser(user);
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