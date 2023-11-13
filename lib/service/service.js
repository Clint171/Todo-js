let db = require("../db/db.js");
let bcrypt = require("bcrypt");

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

let saveNewUser = (user , verificationCode)=>{
    bcrypt.hash(user.password , 10 , (err , hash)=>{
        if(err){
            console.log(err);
            return "error";
        }
        else{
            //Fields that cannot be empty
            if(user.firstName == undefined || user. lastName == undefined || user.defaultEmail == undefined){
                return "error";
            }
            //check if email is a valid email


            user.password = hash;
            if(user.otherNames == undefined || user.otherNames == null){
                user.otherNames = "";
                user.fullName = user.firstName + " " + user.lastName;
            }
            else{
                user.fullName = user.firstName + " " + user.otherNames + " " + user.lastName;
            }
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
            db.createUser(user).then(()=>{
                return "success";
            },()=>{
                return "error";
            });
            }
            catch(err){
                console.log("Error creating new user: "+ err);
                return "error";
            }
        }
    });
}
exports.saveNewUser = saveNewUser;
