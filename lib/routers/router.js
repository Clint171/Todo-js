const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const service = require("../service/service.js");

router.use(bodyParser.urlencoded({
    extended: false
}));

router.use(bodyParser.json());

router.use(express.static("frontend"));

router.post("/signup" , (req , res)=>{
    service.saveUser(req.body).then(()=>{
        console.log(req.body.email + " signed up!");
        res.status(201);
        res.send("success");
    },()=>{
        res.status(500);
        res.send("error");
    });
});

router.post("/login" , (req , res)=>{
    service.getUser(req.body.email).then((user)=>{
        if(user){
            service.comparePasswords(req.body.password , user.password).then((check)=>{
                if(check){
                    console.log(req.body.email + " logged in!");
                    res.status(200);
                    res.send("success");
                }
                else{
                    console.log(req.body.email + " entered wrong password!");
                    res.status(401);
                    res.send("Wrong password!");
                }
            });
        }
        else{
            console.log(req.body.email + " tried to login!");
            res.status(404);
            res.send("User not found!");
        }

    });

});

router.post("/tasks" , (req , res)=>{
    service.saveTask(req.body);
    console.log(req.body.userEmail +" added a task!");
    res.status(201);
    res.send("Tasks uploaded to cloud!");
});

router.get("/" , (req,res)=>{
    res.status(200);
    res.sendFile("index");
});

router.get("/tasks/:email" , (req ,res)=>{
    let email = req.params.email;
    console.log(email +" accessed tasks!");
    service.getTasks(email).then((tasks)=>{
        res.status(200);
        res.send(tasks);
    });
});

router.put("/tasks/:email" , (req , res)=>{
    let email  = req.params.email;
    console.log(email + " updated task id: " + req.body._id);
    service.updateTask(email , req.body).then(()=>{
        res.status(200);
        res.send("success");
    },()=>{
        res.status(500);
        res.send("error");
    });
});

router.delete("/tasks/:email" , (req , res)=>{
    let email = req.params.email;
    service.deleteTask(email , req.body._id).then(()=>{
        console.log(email + " deleted task id: " + req.body._id);
        res.status(200);
        res.send("success");
    },
    ()=>{
        res.status(500);
        res.send("error");
    });
});

module.exports = router;