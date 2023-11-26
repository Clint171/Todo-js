const mongoose = require("mongoose");
const User = require("../schemas/user.js");
const dotenv = require("dotenv");
const Task = require("../schemas/task.js");
// const JoinRequest = require("../schemas/joinRequest.js");
// const JoinCode = require("../schemas/joinCode.js");
// const Group = require("../schemas/group.js");
// const Event = require("../schemas/event.js");
// const Comment = require("../schemas/comment.js");
// const Attachment = require("../schemas/attachment.js");

//const Notification = require("../schemas/notification.js");
//const Message = require("../schemas/message.js");

dotenv.config();

const url = process.env.MONGO_URL;

mongoose.connect(url , {
    dbName : "Todo-js"
});