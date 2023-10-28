let db = require("../db/db.js");


function findTasks(email){

    let tasks =  db.findTasks(email);
    return tasks;

}

function saveTasks(tasks){

    return db.addTasks(
        new db.Task(tasks.user , tasks.tasks)
    )

}

exports.findTasks = findTasks;

exports.saveTasks = saveTasks;