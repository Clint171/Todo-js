const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db/db.js");

const auth = require("../service/auth.js");


const router = express.Router();

router.use(bodyParser.urlencoded({
    extended : false
}));
router.use(auth);

router.post("/" , (req , res)=>{

});

router.get("/" , (req , res)=>{
    res.send("Accessing tasks for : " + req.user.defaultEmail);
});

router.get("/pending" , (req , res)=>{
    res.send("Pending tasks");
});

router.get("/overdue" , (req , res)=>{
    res.send("Overdue tasks");
});

router.get("/completed" , (req , res)=>{
    res.send("Completed tasks");
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