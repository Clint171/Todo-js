const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const login = require("../service/login.js");
const auth = require("../service/auth.js");

// email exists 
// send invalid user
// compare passwords
// send invalid password

// generate token and a refresh token
// set expiry of the refresh token to be longer than the token
// expiry of the token
// send token in the request  body
// status logged:true
// request token
// 

// /dashboard 
// Bearer token
// we extract the token 
// validate the token
// if expired use refresh token to generate new token 
// else send the dashboard response
// 

router.use(bodyParser.urlencoded({
    extended: false
}));

router.post("/login" , login.loginUser , (err , req , res)=>{
    console.log(JSON.stringify(err));
    res.status(err.status);
    res.send(err.message);
});

router.get("/login" , (req , res)=>{
    res.send("Login page");
});

module.exports = router;