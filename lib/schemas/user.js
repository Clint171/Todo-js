const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : String,
    password : String
});

taskSchema.pre("save" , ()=>{
    const salt = bcrypt.genSalt(10);
    const hash = bcrypt.hash(userSchema.password, salt);
});

module.exports = mongoose.model("User" , userSchema);