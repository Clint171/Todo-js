const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const service = require("../service/service.js");
const email = require("../service/email.js");

router.use(bodyParser.urlencoded({
    extended: false
}));

router.post("/signup" , service.saveNewUser , (err , req , res)=>{
    res.status(err.status);
    res.send(err.message);
});

router.get("/verification/:email/:code" , service.verifyNewUser , (err ,req ,res)=>{
});

router.get("/signup" , (req , res)=>{
    res.sendFile("signup.html");
});

module.exports = router;