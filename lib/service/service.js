let db = require("../db/db.js");
let Task = require("../schemas/task.js");
let User = require("../schemas/user.js");

let user = new User({
    email : "clintsimiyu004@gmail.com",
    password : "password"
});

db.saveUser(user);