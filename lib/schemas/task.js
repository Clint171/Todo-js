const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    groupId : {type: Schema.Types.ObjectId, ref: 'Group', required: false},
    ownerId : {type: Schema.Types.ObjectId, ref: 'User', required: true},
    editors : [{type: Schema.Types.ObjectId, ref: 'User', required: false}],
    editorsCount : Number,
    editorsCountString : String,
    // read , update , delete - editor permissions
    editorPermissions : String,
    title : String,
    description : String,
    creationDate : String,
    creationTime : String,
    // pending, ongoing, completed - statuses
    status : String,
    overdue : Boolean,
    // low, medium, high - priorities
    priority : String,
    dueDate : String,
    dueTime : String,
    completionDate : String,
    completionTime : String,
    comments : [{type: Schema.Types.ObjectId, ref: 'Comment', required: false}],
    commentsCount : Number,
    // public, private, editors , group - visibility
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