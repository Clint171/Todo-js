const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db/db.js");

const auth = require("../service/auth.js");


const router = express.Router();

router.use(bodyParser.urlencoded({
    extended : false
}));

router.get("/" , auth , (req , res)=>{
    res.send("Accessing tasks for : " + req.user.defaultEmail);
});

module.exports = router;