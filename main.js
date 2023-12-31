const express = require("express");
const cors = require("cors");
const db = require("./lib/db/db.js");
const signupRouter = require("./lib/routers/user/signupRouter.js");
const loginRouter = require("./lib/routers/user/loginRouter.js");
const userRouter = require("./lib/routers/user/userRouter.js");
const groupRouter = require("./lib/routers/group/groupRouter.js");
const userTaskRouter = require("./lib/routers/task/userTaskRouter.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

let port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(signupRouter);
app.use(loginRouter);
app.use("/users" ,userRouter);
app.use("/tasks" , userTaskRouter);
app.use("/groups" , groupRouter);

app.listen(port , ()=>{
    console.log(`Server listening on port ${port}`);
});