const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const login = require("../../service/user/login.js");

router.use(bodyParser.urlencoded({
    extended: false
}));

router.post("/login" , login.loginUser , (err , req , res)=>{
    res.status(err.status);
    res.send(err.message);
});

router.get("/login" , (req , res)=>{
    res.send("login");
})

module.exports = router;