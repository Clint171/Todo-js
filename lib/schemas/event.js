const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const eventSchema = new Schema({
    groupId : {type: Schema.Types.ObjectId, ref: 'Group', required: false},
    ownerId : {type: Schema.Types.ObjectId, ref: 'User', required: true},
    editors : [{type: Schema.Types.ObjectId, ref: 'User', required: false}],
    editorsCount : Number,
    editorsCountString : String,
    editorPermissions : String,
    title : String,
    description : String,
    creationDate : String,
    creationTime : String,
    startDate : String,
    startTime : String,
    endDate : String,
    endTime : String,
    duration : Number,
    durationString : String,
    // pending, ongoing, completed - statuses
    status : String,
    // low, medium, high - priorities
    priority : String,
    subevents : [{type: Schema.Types.ObjectId, ref: 'Event', required: false}],
    subeventsCount : Number,
    likes : [{type: Schema.Types.ObjectId, ref: 'User', required: false}],
    likesCount : Number,
    dislikes : [{type: Schema.Types.ObjectId, ref: 'User', required: false}],
    dislikesCount : Number,
    comments : [{type: Schema.Types.ObjectId, ref: 'Comment', required: false}],
    commentsCount : Number,
    // public, private, editors , group - visibility
    visibility: String,
});

module.exports = mongoose.model("Event", eventSchema , "Event");