const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const service = require("../service/service.js");

router.use(bodyParser);
router.use(express.static("frontend"));


router.post("/tasks/:id" , (req , res)=>{
    let task = {
        user : req.params.id,
        tasks : req.body
    }
    console.log(req);
    service.saveTasks(task);
    res.status(201);
    res.send("Tasks uploaded to cloud!");
});

router.get("/" , (req,res)=>{
    res.status(200);
    res.sendFile("index");
});

router.get("/tasks/:email" , (req ,res)=>{
    let email = req.params.email;
    console.log(email);
    res.send(service.findTasks(email));
});

module.exports = router;