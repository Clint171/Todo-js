const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const service = require("../service/service.js");
const email = require("../service/email.js");

router.use(bodyParser.urlencoded({
    extended: false
}));

router.post("/signup" , (req , res)=>{
    const verificationCode = Math.floor(Math.random() * 1000000);
    service.saveNewUser(req.body , verificationCode);
    console.log(req.body.email + " signed up!");
    //Send verification code to email
    email.sendHtmlMail(req.body.email , "Todo Email Verification" , `<h1>Welcome Aboard!<h1><h3>We're glad you chose to join us.</h3><p>Here's your verification code: ${verificationCode}<br>Hurry, it expires in 15 minutes!</p><p>Not you? Don't worry, someone might have mistyped their email. You can ignore or delete this email.</p>`);
    //redirect to email sent page
    res.status(201);
    res.redirect("/verification");
});

router.post("/verification" , (req ,res)=>{
    res.send("Account verified!");
    res.redirect("/login");
});

router.get("/verification" , (req , res)=>{
    res.send("verification page for email.");
});

module.exports = router;