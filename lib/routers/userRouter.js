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

router.post("/verification" , (req ,res)=>{
    res.send("Account verified!");
    res.redirect("/login");
});

router.get("/verification" , (req , res)=>{
    res.send("An email has been sent.");
});

module.exports = router;