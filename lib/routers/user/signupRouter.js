const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const service = require("../../service/user/userService.js");

router.use(bodyParser.urlencoded({
    extended: false
}));

router.post("/signup" , service.saveNewUser , (err , req , res)=>{
    res.status(err.status);
    res.send(err.message);
});

router.get("/verification/:email/:code" , service.verifyNewUser , (err ,req ,res)=>{
});

router.get("/resend-verification/:email" , service.resendVerification);

module.exports = router;