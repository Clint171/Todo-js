const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.MONGO_URL;

mongoose.connect(url , {
    dbName : "masterplanner"
});