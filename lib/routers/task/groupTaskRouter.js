const express = require("express");
const bodyParser = require("body-parser");
const groupTaskService = require("../../service/task/groupTaskService.js");
const auth = require("../../service/user/auth.js");

const router = express.Router();

router.use(bodyParser.urlencoded({
    extended : false
}));

router.use(auth);

router.post("/" , groupTaskService.saveGroupTask);

router.get("/" , groupTaskService.getGroupTasks);

router.get("/pending" , groupTaskService.getGroupPendingTasks);

router.get("/overdue" , groupTaskService.getGroupOverdueTasks);

router.get("/completed" , groupTaskService.getGroupCompletedTasks);

router.get("/ongoing" , groupTaskService.getGroupOngoingTasks);

router.get("/:taskId/comments" , groupTaskService.getGroupTaskComments);

router.put("/:taskId" , groupTaskService.updateGroupTask);

router.delete("/:taskId" , groupTaskService.deleteGroupTask);

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