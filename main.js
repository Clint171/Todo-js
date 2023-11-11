const express = require("express");
const router = require("./lib/routers/router.js");
const dotenv = require("dotenv");
const session = require("express-session");
const User = require("../schemas/user.js");
const Task = require("../schemas/task.js");
const url = process.env.MONGO_URL;

mongoose.connect(url , {
    dbName : "Todo-js"
});

//Set up session store
const MongoStore = require("connect-mongo")(session);
const store = new MongoStore({
    mongooseConnection : mongoose.connection,
    collection : "sessions"
});

dotenv.config();

const app = express();

let port = process.env.PORT || 3500;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(router);

app.listen(port , ()=>{
    console.log(`Server listening on port ${port}`);
});