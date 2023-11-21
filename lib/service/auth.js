const jwt = require('jsonwebtoken');

require("dotenv").config();

let auth = (req , res , next)=>{
    if(req.headers["authorization"]){
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(' ')[1];
        if(token == null){
            res.redirect("/login");
            return;
        }
        else{
            jwt.verify(token , process.env.JWT_SECRET , (err , user)=>{
                if(err){
                    res.redirect("/login");
                    return;
                }
                else{
                    req.user = user;
                    console.log(user.verified);
                    if(user.verified){
                        next();
                    }
                    else{
                        res.status(401);
                        res.send("Verify account!");
                    }
                }
            })
        }
    }
    else{
        res.redirect("/login");
        return;
    }
}
module.exports = auth;