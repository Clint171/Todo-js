const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    groupId : {type: Schema.Types.ObjectId, ref: 'Group', required: false},
    ownerId : {type: Schema.Types.ObjectId, ref: 'User', required: true},
    editors : [{type: Schema.Types.ObjectId, ref: 'User', required: false}],
    title : String,
    description : String,
    creationDate : String,
    creationTime : String,
    status : String,
    priority : String,
    dueDate : String,
    dueTime : String,
    completionDate : String,
    completionTime : String,
    comments : [{type: Schema.Types.ObjectId, ref: 'Comment', required: false}],
    commentsCount : Number,
    visibility: String,
    attachments : [{type: Schema.Types.ObjectId, ref: 'Attachment', required: false}],
    subtasks : [{type: Schema.Types.ObjectId, ref: 'Task', required: false}],
    subtasksCompleted : Number,
    subtasksTotal : Number,
    subtasksCompletionPercentage : Number,
    subtasksCompletionPercentageString : String,
    parentTask : {type: Schema.Types.ObjectId, ref: 'Task', required: false},
    parentTaskCompleted : Boolean,
    parentTaskCompletionPercentage : Number,
    parentTaskCompletionPercentageString : String
});

module.exports = mongoose.model("Task", taskSchema , "Task");