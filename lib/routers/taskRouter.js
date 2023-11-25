const express = require("express");
const bodyParser = require("body-parser");
const taskService = require("../service/taskService.js");
const commentRouter = require("./commentRouter.js");

const auth = require("../service/auth.js");


const router = express.Router();

router.use("/comments" , commentRouter);

router.use(bodyParser.urlencoded({
    extended : false
}));

router.use(auth);

router.post("/" , taskService.saveUserTask);

router.get("/" , taskService.getUserTasks);

router.get("/pending" , taskService.getUserPendingTasks);

router.get("/overdue" , taskService.getUserOverdueTasks);

router.get("/completed" , taskService.getUserCompletedTasks);

router.get("/ongoing" , taskService.getUserOngoingTasks);

router.get("/:taskId/comments" , taskService.getUserTaskComments);


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