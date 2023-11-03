const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {type : String , unique : true},
    password : String
});

// userSchema.pre("save" , (next)=>{
//     const salt = bcrypt.genSalt(10);
//     this.password = bcrypt.hash(this.password, salt);
//     next()
// });

module.exports = mongoose.model("User" , userSchema , "User");