//Middleware to check login info and create token and append it to response
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const db = require("../db/db.js");

let verifyLogin = (req , res , next){
    let user = db.getUser({username : req.body.username});
    if(user == null || user == undefined){
        res.status(401).send("Invalid username");
    }
    else{
        let match = bcrypt.compareSync(req.body.password , user.password);
        if(match){
            let token = jwt.sign({username : user.username , id : user._id} , process.env.JWT_SECRET);
            //using express session
            req.session.user = user;
            req.session.token = token;
            next();
        }
        else{
            res.status(401).send("Invalid password");
        }
    }
}
exports.verifyLogin = verifyLogin;

let signupToken = (req , res , next)=>{
    let user = db.getUser({username : req.body.username});
    if(user == null || user == undefined){
        let token = jwt.sign({username : req.body.username} , process.env.JWT_SECRET);
        req.session.token = token;
        next();
    }
    else{
        res.status(401).send("User already exists");
    }
}