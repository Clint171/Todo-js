const mongoose = require("mongoose");
const User = require("../../schemas/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let loginUser = (req , res , next)=>{
    User.findOne({defaultEmail  : req.body.email}).then(dbUser => {
        if(!dbUser.verified){
            res.status(401);
            res.send("Verify account!");
            return;
        }
        bcrypt.compare(req.body.password , dbUser.password).then((result)=>{
            if(result){
                let token = generateToken(dbUser);
                res.json({"token" : token});
                dbUser.lastLoginUtcDate = new Date();
                dbUser.save();
                return;
            }
            else{
                let err = new Error("Invalid login");
                err.status = 401;
                next(err , req , res);
            }
        });
    });
}
exports.loginUser = loginUser;

let generateToken = (user)=>{
    user = JSON.stringify(user);
    return jwt.sign(user, process.env.JWT_SECRET);
}