//Middleware to check login info and create token an append it to response
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const db = require("../db/db.js");

let verifyLogin = (req , res , next){
    let user = db.
}