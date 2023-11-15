const express = require("express");
//const router = require("./lib/routers/router.js");
const userRouter = require("./lib/routers/userRouter.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

let port = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(signupRouter);
app.use(loginRouter);

app.listen(port , ()=>{
    console.log(`Server listening on port ${port}`);
});