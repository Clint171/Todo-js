const express = require("express");
//const router = require("./lib/routers/router.js");
const db = require("./lib/db/db.js");
const signupRouter = require("./lib/routers/user/signupRouter.js");
const loginRouter = require("./lib/routers/user/loginRouter.js");
const taskRouter = require("./lib/routers/task/taskRouter.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

let port = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(signupRouter);
app.use(loginRouter);
app.use("/tasks" , taskRouter);

app.listen(port , ()=>{
    console.log(`Server listening on port ${port}`);
});