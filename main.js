const express = require("express");
const router = require("./lib/routers/router.js");
const dotenv = require("dotenv");
const User = require("../schemas/user.js");
const Task = require("../schemas/task.js");
const url = process.env.MONGO_URL;

mongoose.connect(url , {
    dbName : "Todo-js"
});

dotenv.config();

const app = express();

let port = process.env.PORT || 3500;

app.use(router);

app.listen(port , ()=>{
    console.log(`Server listening on port ${port}`);
});