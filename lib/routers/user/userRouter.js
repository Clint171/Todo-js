const express = require("express");
const bodyParser = require("body-parser");
const userService = require("../../service/user/userService.js");
const auth = require("../../service/user/auth.js");
const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));

router.use(auth);

//user info

router.get("/search/:query" , userService.searchUser);

router.get("/id/:id" , userService.readUser);

router.get("/email/:email" , userService.readUserByEmail);

module.exports = router;