let db = require("../db/db.js");
let Task = require("../schemas/task.js");
let User = require("../schemas/user.js");

function findTasks(email){

    let tasks =  db.findTasks(email);
    let returnArray = [];
    for(i = 0 ; i < tasks.length ; i++){
        returnArray.push(tasks[i].tasks);
    }
    return returnArray;
}

function saveTasks(tasks){

    return db.addTasks(
        new db.Task(tasks.user , tasks.tasks)
    )

}

exports.findTasks = findTasks;

exports.saveTasks = saveTasks;