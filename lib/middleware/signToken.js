const db = require("../db/db.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let signToken = (user)=>{
    let token = jwt.sign({email : user.email} , process.env.JWT_SECRET);
    return token;
}

module.exports = signToken;