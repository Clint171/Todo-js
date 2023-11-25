let db = require("../db/db.js");
const User = require("../schemas/user.js");
let bcrypt = require("bcrypt");
let email = require("../service/email.js");

/**
 * @author Clint171
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let saveNewUser = async (req , res , next)=>{
    let user = new User(req.body);
    const verificationCode = Math.floor(Math.random() * 1000000);
    db.getUser({defaultEmail : user.defaultEmail}).then((dbUser , err)=>{
        if(dbUser != null || dbUser != undefined){
            res.status(409);
            res.send("User already exists!");
            return;
        }
        else{
            bcrypt.hash(user.password , 10 ,(err , hash)=>{
                if(err){
                    console.log(err);
                    next(err , req , res);
                }
                else{
                    //Fields that cannot be empty
                    if(user.firstName == undefined || user. lastName == undefined || user.defaultEmail == undefined){
                        let err = new Error("Empty fields!");
                        err.status = 400;
                        next(err , req , res);
                    }
                    if(user.firstName == "" || user. lastName == "" || user.defaultEmail == ""){
                        let err = new Error("Empty fields!");
                        err.status = 400;
                        next(err , req , res);
                    }
                    user.password = hash;
                    if(user.otherNames == undefined || user.otherNames == null){
                        user.otherNames = "";
                        user.fullName = user.firstName + " " + user.lastName;
                    }
                    else{
                        user.fullName = user.firstName + " " + user.otherNames + " " + user.lastName;
                    }
                    user.emails = [user.defaultEmail];
                    user.verificationCode = verificationCode;
                    user.verified = false;
                    let creationDate = new Date();
                    //verification code expires in 15 minutes
                    let expirationDate = new Date(creationDate.getTime() + 15*60000);
                    user.verificationCodeExpirationUtcDate = expirationDate.getUTCDate() + "/" + expirationDate.getUTCMonth() + "/" + expirationDate.getUTCFullYear();
                    user.verificationCodeExpirationUtcTime = expirationDate.getUTCHours() + ":" + expirationDate.getUTCMinutes() + ":" + expirationDate.getUTCSeconds();
                    user.verificationCodeExpirationUtcTimestamp = expirationDate.getTime();
                    user.creationUtcDate = creationDate.getUTCDate() + "/" + creationDate.getUTCMonth() + "/" + creationDate.getUTCFullYear();
                    user.creationUtcTime = creationDate.getUTCHours() + ":" + creationDate.getUTCMinutes() + ":" + creationDate.getUTCSeconds();
                    user.creationUtcTimestamp = creationDate.getTime();
                    user.visibility = "public";
                    user.status = "inactive";
                    user.accountType = "free";
                    try{
                    user.save();
                    }
                    catch(err){
                        console.log(err);
                        next(err , req , res);
                        return err;
                    }
                    email.sendHtmlMail(req.body.defaultEmail , "Todo Email Verification" , `<h1>Welcome Aboard!<h1><h3>We're glad you chose to join us.</h3><p> Click <a href="http://localhost:3000/verification/${user.defaultEmail}/${user.verificationCode}">HERE</a> to verify your account and begin your journey with us :)</p><br><p>Not you? Don't worry, someone might have mistyped their email. You can ignore or delete this email.</p>`);
                    res.status(201);
                    res.end("User created!");
                }
            });
        }
    });
}
exports.saveNewUser = saveNewUser;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let readUser = async (req , res , next)=>{
    let dbUser = await db.getUserById(req.params.id);
    if(dbUser == null || dbUser == undefined){
        let err = new Error("User not found!");
        err.status = 404;
        next(err , req , res);
        return;
    }
    else{
        res.status(200);
        res.send(dbUser);
    }

}
exports.readUser = readUser;

/**
 * @author Clint171
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
let updateUser = async (req , res , next)=>{
    let dbUser = await db.getUserById(req.params.id);
    if(dbUser == null || dbUser == undefined){
        let err = new Error("User not found!");
        err.status = 404;
        next(err , req , res);
        return;
    }
    else{
        let updates = req.body;
        try{
            db.updateUserById(req.params.id , updates);
        }
        catch(err){
            console.log(err);
            next(err , req , res);
            return;
        }
        res.status(200);
        res.send("User updated!");
    }
}
exports.updateUser = updateUser;

/**
 * @author Clint171
 * @param {*} req
 * @param {*} res
 * @param {*} next
*/
let deleteUser = async (req , res , next)=>{
    let dbUser = await db.getUserById(req.params.id);
    if(dbUser == null || dbUser == undefined){
        let err = new Error("User not found!");
        err.status = 404;
        next(err , req , res);
        return;
    }
    else{
        try{
            db.deleteUserById(req.params.id);
        }
        catch(err){
            console.log(err);
            next(err , req , res);
            return;
        }
        email.sendHtmlMail(dbUser.defaultEmail , "Todo Account Deletion" , `<h1>Account Deleted!</h1><p>Your account has been deleted.</p><p>If you didn't delete your account, please contact us immediately.</p>`);
        res.status(200);
        res.send("User deleted!");
    }
}
exports.deleteUser = deleteUser;

/**
 * @author Clint171
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let verifyNewUser = async (req , res , next)=>{
    let dbUser = await db.getUser({defaultEmail : req.params.email});
    if(dbUser.verificationCode == req.params.code){
        let now = new Date();
        if(dbUser.verificationCodeExpirationUtcTimestamp > now.getTime()){
            db.updateUser({defaultEmail : req.params.email} , {verified : true , status : "active" , verificationCode : null , verificationCodeExpirationUtcDate : null , verificationCodeExpirationUtcTime : null , verificationCodeExpirationUtcTimestamp : null});
            res.status(200);
            res.redirect("/login");
        }
        else{
            db.updateUser({defaultEmail : req.params.email} , {verificationCode : null , verificationCodeExpirationUtcDate : null , verificationCodeExpirationUtcTime : null , verificationCodeExpirationUtcTimestamp : null});
            res.status(401);
            res.send("Verification code expired: "+ dbUser.verificationCodeExpirationUtcTimestamp +" : "+ now.getTime());
        }
    }
    else{
        db.updateUser({defaultEmail : req.params.email} , {verificationCodeAttemts : {$inc : 1}});
        res.status(401);
        res.send("Invalid verification code : "+ req.params.code);
    }
}
exports.verifyNewUser = verifyNewUser;