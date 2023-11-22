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
    db.getTasks({ownerId : req.user._id}).then( tasks =>{
        res.json(tasks);
    });
});

router.get("/pending" , (req , res)=>{
    db.getTasks({ownerId : req.user._id}).then(tasks =>{
        let returnTasks = [];
        tasks.forEach(task => {
            if(task.status == "pending"){
                returnTasks.push(task);
            }
        });
        res.json(returnTasks);
    });
});

router.get("/overdue" , (req , res)=>{
    db.getTasks({ownerId : req.user._id}).then(tasks =>{
        let returnTasks = [];
        tasks.forEach(task => {
            if(task.overdue){
                returnTasks.push(task);
            }
        });
        res.json(returnTasks);
    });
});

router.get("/completed" , (req , res)=>{
    db.getTasks({ownerId : req.user._id}).then(tasks =>{
        let returnTasks = [];
        tasks.forEach(task=>{
            if(task.status == "completed"){
                returnTasks.push(task);
            }
        });
        res.json(returnTasks);
    });
});

router.get("/ongoing" , (req , res)=>{
    db.getTasks({ownerId : req.user._id}).then(tasks =>{
        let returnTasks = [];
        tasks.forEach(task=>{
            if(task.status == "ongoing"){
                returnTasks.push(task);
            }
        });
        res.json(returnTasks);
    });
})

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

//handle 404 errors
router.use((req , res , next)=>{
    res.status(404).send("404 not found");
});

//handle internal errors
router.use((err , req , res , next)=>{
    console.error(err.stack);
    res.status(500).send("error");
});


module.exports = router;