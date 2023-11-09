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
    likes : [{type: Schema.Types.ObjectId, ref: 'User', required: false}],
    likesCount : Number,
    dislikes : [{type: Schema.Types.ObjectId, ref: 'User', required: false}],
    dislikesCount : Number,
    visibility: String,
});

module.exports = mongoose.model("Comment", commentSchema , "Comment");