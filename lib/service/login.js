const mongoose = require("mongoose");
const db = require("../db/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let loginUser = async(req , res , next)=>{
    let dbUser = await db.getUser({defaultEmail  : req.body.email});
    bcrypt.compare(req.body.password , dbUser.password).then((result)=>{
        if(result){
            let token = generateToken(dbUser);
            res.json({"token" : token});
            return;
        }
        else{
            let err = new Error("Invalid login");
            err.status = 401;
            next(err , req , res);
        }
    });
}
exports.loginUser = loginUser;

let generateToken = (user)=>{
    user = JSON.stringify(user);
    return jwt.sign(user, process.env.JWT_SECRET);
}