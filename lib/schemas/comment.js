const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const commentSchema = new Schema({
    taskId : {type: Schema.Types.ObjectId, ref: 'Task', required: true},
    ownerId : {type: Schema.Types.ObjectId, ref: 'User', required: true},
    editors : [{type: Schema.Types.ObjectId, ref: 'User', required: false}],
    title : String,
    description : String,
    creationDate : String,
    creationTime : String,
    status : String,
    priority : String,
    subcomments : [{type: Schema.Types.ObjectId, ref: 'Comment', required: false}],
    subcommentsCount : Number,
    visibility: String,
});