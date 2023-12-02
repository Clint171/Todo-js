const User = require("../../schemas/user.js");
let bcrypt = require("bcrypt");
let email = require("../email/email.js");

/**
 * @author Clint171
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let saveNewUser = async (req , res , next)=>{
    let user = new User(req.body);
    const verificationCode = Math.floor(Math.random() * 1000000);
    User.findOne({defaultEmail : user.defaultEmail}).then((dbUser , err)=>{
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
                    email.sendHtmlMail(req.body.defaultEmail , "Todo Email Verification" , `<h1>Welcome Aboard!<h1><h3>We're glad you chose to join us.</h3><p> Click <a href="${process.env.URL}/verification/${user.defaultEmail}/${user.verificationCode}">HERE</a> to verify your account and begin your journey with us :)</p><br><p>Not you? Don't worry, someone might have mistyped their email. You can ignore or delete this email.</p>`);

                    res.status(201);
                    res.send({id : user._id , fullName : user.fullName});
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
let readUser = (req , res , next)=>{
    User.findById(req.params.id).then(dbUser =>{
        if(dbUser == null || dbUser == undefined){
            let err = new Error("User not found!");
            err.status = 404;
            next(err , req , res);
            return;
        }
        else{
            let returnUser = {
                id : dbUser._id,
                fullName : dbUser.fullName,
                profilePictureUrl : dbUser.profilePictureUrl
            }

            res.status(200);
            res.send(returnUser);
        }
    });
    

}
exports.readUser = readUser;

let readUserByEmail = (req , res , next)=>{
    User.findOne({defaultEmail : req.params.email}).then(dbUser =>{
        if(dbUser == null || dbUser == undefined){
            let err = new Error("User not found!");
            err.status = 404;
            next(err , req , res);
            return;
        }
        else{
            let returnUser = {
                id : dbUser._id,
                fullName : dbUser.fullName,
                profilePictureUrl : dbUser.profilePictureUrl
            }

            res.status(200);
            res.send(returnUser);
        }
    });
}
exports.readUserByEmail = readUserByEmail;

/**
 * @author Clint171
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
let updateUser = (req , res , next)=>{
    User.findById(req.user._id).then(dbUser =>{
        if(dbUser == null || dbUser == undefined){
            let err = new Error("User not found!");
            err.status = 404;
            next(err , req , res);
            return;
        }
        else{
            let updates = req.body;
            try{
                User.findByIdAndUpdate(req.params.id , updates);
            }
            catch(err){
                console.log(err);
                next(err , req , res);
                return;
            }
            res.status(200);
            res.send("User updated!");
        }
    });
}
exports.updateUser = updateUser;

/**
 * @author Clint171
 * @param {*} req
 * @param {*} res
 * @param {*} next
*/
let deleteUser =(req , res , next)=>{
    User.findById(req.user._id).then(dbUser =>{
        if(dbUser == null || dbUser == undefined){
            let err = new Error("User not found!");
            err.status = 404;
            next(err , req , res);
            return;
        }
        else{
            try{
                User.findByIdAndDelete(req.params.id);
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
    });
}
exports.deleteUser = deleteUser;

/**
 * @author Clint171
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let verifyNewUser = (req , res , next)=>{
    User.findOne({defaultEmail : req.params.email}).then(dbUser =>{
        if(dbUser.verificationCode == req.params.code){
            let now = new Date();
            if(dbUser.verificationCodeExpirationUtcTimestamp > now.getTime()){
                User.findOneAndUpdate({defaultEmail : req.params.email} , {verified : true , status : "active" , verificationCode : null , verificationCodeExpirationUtcDate : null , verificationCodeExpirationUtcTime : null , verificationCodeExpirationUtcTimestamp : null}).then(()=>{
                    res.status(200);
                    res.send("Account verified! You can now log in.");
                });
            }
            else{
                User.findOneAndUpdate({defaultEmail : req.params.email} , {verificationCode : null , verificationCodeExpirationUtcDate : null , verificationCodeExpirationUtcTime : null , verificationCodeExpirationUtcTimestamp : null}).then(()=>{
                    res.status(401);
                    res.send("Verification code expired: "+ dbUser.verificationCodeExpirationUtcTimestamp +" : "+ now.getTime());
                });
            }
        }
        else{
            User.findOneAndUpdate({defaultEmail : req.params.email} , {verificationCodeAttemts : {$inc : 1}}).then(()=>{
                res.status(401);
                res.send("Invalid verification code : "+ req.params.code);
            });
        }
    });
    
}
exports.verifyNewUser = verifyNewUser;

let resendVerification = (req , res , next)=>{
    User.findOne({defaultEmail : req.params.email}).then(dbUser =>{
        if(dbUser == null){
            res.status(404).send("User not found!");
            return;
        }
        const verificationCode = Math.floor(Math.random() * 1000000);
        dbUser.verificationCode = verificationCode;
        let now = new Date();
        let expirationDate = new Date(now.getTime() + 15*60000);
        dbUser.verificationCodeExpirationUtcDate = expirationDate.getUTCDate() + "/" + expirationDate.getUTCMonth() + "/" + expirationDate.getUTCFullYear();
        dbUser.verificationCodeExpirationUtcTime = expirationDate.getUTCHours() + ":" + expirationDate.getUTCMinutes() + ":" + expirationDate.getUTCSeconds();
        dbUser.verificationCodeExpirationUtcTimestamp = expirationDate.getTime();
        dbUser.updateOne({verificationCodeAttemts : {$inc : 1}});
        dbUser.save();
        email.sendHtmlMail(dbUser.defaultEmail , "Todo Email Verification" , `<h1>Welcome Aboard!<h1><h3>We're glad you chose to join us.</h3><p> Click <a href="http://localhost:3000/verification/${dbUser.defaultEmail}/${dbUser.verificationCode}">HERE</a> to verify your account and begin your journey with us :)</p><br><p>Not you? Don't worry, someone might have mistyped their email. You can ignore or delete this email.</p>`);
        res.status(200).end("Email sent");
});
}
exports.resendVerification = resendVerification;

let searchUser = (req , res , next)=>{
    User.find({fullName : {$regex : req.params.query , $options : "i"}}).then(dbUsers =>{
        if(dbUsers == null || dbUsers == undefined){
            res.status(404);
            res.send("No users found!");
            return;
        }
        else{
            let users = [];
            dbUsers.forEach((user)=>{
                users.push({fullName : user.fullName , id : user._id , profilePictureUrl : user.profilePictureUrl});
            });
            res.status(200);
            res.send(users);
        }
    });
}
exports.searchUser = searchUser;