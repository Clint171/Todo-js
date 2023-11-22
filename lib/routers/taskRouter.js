const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db/db.js");
const taskService = require("../service/taskService.js");

const auth = require("../service/auth.js");


const router = express.Router();

router.use(bodyParser.urlencoded({
    extended : false
}));
router.use(auth);

router.post("/" , taskService.saveUserTask);

router.get("/" , (req , res)=>{
    res.json(db.findTasks(req.user.defaultEmail));
});

router.get("/pending" , (req , res)=>{
    let tasks = db.findTasks(req.user.defaultEmail);
    let returnTasks = [];
    tasks.forEach(task => {
        if(task.status == "pending"){
            returnTasks.push(task);
        }
    });
    res.json(returnTasks);
});

router.get("/overdue" , (req , res)=>{
    let tasks = db.findTasks(req.user.defaultEmail);
    let returnTasks = [];
    tasks.forEach(task=>{
        if(task.overdue){
            returnTasks.push(task);
        }
    });
    res.json(returnTasks);
});

router.get("/completed" , (req , res)=>{
    let tasks = db.findTasks(req.user.defaultEmail);
    let returnTasks = [];
    tasks.forEach(task=>{
        if(task.status == "completed"){
            returnTasks.push(task);
        }
    });
    res.json(returnTasks);
});

router.get("/:groupId" , (req , res)=>{
    res.send("tasks for group : " + req.params.groupId);
});

router.get("/:groupId/pending" , (req , res)=>{
    res.send("Pending tasks for group : " + req.params.groupId);
});

router.get("/:groupId/overdue" , (req , res)=>{
    res.send("overdue tasks for group : " + req.params.groupId);
});

router.get("/:groupId/completed" , (req , res)=>{
    res.send("Completed tasks for group : " + req.params.groupId);
});

module.exports = router;