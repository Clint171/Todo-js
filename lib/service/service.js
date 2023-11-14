let db = require("../db/db.js");
let bcrypt = require("bcrypt");
let email = require("../service/email.js");

let saveUser = (user)=>{
    bcrypt.hash(user.password , 10 , (err , hash)=>{
        if(err){
            console.log(err);
            return "error";
        }
        else{
            user.password = hash;
            db.createUser(user).then(()=>{
                return "success";
            },()=>{
                return "error";
            });
        }
    });
}
exports.saveUser = saveUser;


/**
 * @author Clint171
 * @param {*} user 
 * @param {*} verificationCode - generated in router.
 * 
 * User object should be passed to saveNewUser containing :-
 *      -firstName
 *      -lastName
 *      -defaultEmail
 *      -password
 *      -timeZone - not implemented yet
 * 
 */

let saveNewUser = async (req , res , next)=>{
    let user = req.body;
    const verificationCode = Math.floor(Math.random() * 1000000);
    let dbUser = await db.getUser({defaultEmail : user.defaultEmail});
    if(dbUser != null || dbUser != undefined){
        res.status(409);
        res.send("User already exists!");
    }
    bcrypt.hash(user.password , 10 , (err , hash)=>{
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
            db.createUser(user);
            }
            catch(err){
                console.log(err);
                next(err , req , res);
            }
            email.sendHtmlMail(req.body.defaultEmail , "Todo Email Verification" , `<h1>Welcome Aboard!<h1><h3>We're glad you chose to join us.</h3><p>Here's your verification code:</p><h2>${verificationCode}</h2><p>Hurry, the code expires in 15 minutes!</p><br><p>Not you? Don't worry, someone might have mistyped their email. You can ignore or delete this email.</p>`);
            res.status(201);
            res.redirect("/verification");
        }
    });
}
exports.saveNewUser = saveNewUser;
