const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const groupSchema = new Schema({
    name : String,
    description : String,
    creationDate : String,
    creationTime : Number,
    parentGroup : {type: Schema.Types.ObjectId, ref: 'Group', required: false},
    childGroups : [{type: Schema.Types.ObjectId, ref: 'Group', required: false}],
    childGroupsCount : Number,
    members : [{type: Schema.Types.ObjectId, ref: 'User', required: false}],
    membersCount : Number,
    admins : [{type: Schema.Types.ObjectId, ref: 'User', required: false}],
    adminsCount : Number,
    owner : {type: Schema.Types.ObjectId, ref: 'User', required: true},
    // public, private, editors , group - visibility
    visibility: String,
    tasks : [{type: Schema.Types.ObjectId, ref: 'Task', required: false}],
    tasksCount : Number,
    events : [{type: Schema.Types.ObjectId, ref: 'Event', required: false}],
    eventsCount : Number,
    comments : [{type: Schema.Types.ObjectId, ref: 'Comment', required: false}],
    commentsCount : Number,
    attachments : [{type: Schema.Types.ObjectId, ref: 'Attachment', required: false}],
    attachmentsCount : Number,
    joinRequests : [{type: Schema.Types.ObjectId, ref: 'JoinRequest', required: false}],
    joinRequestsCount : Number,
    joinRequestsAccepted : Number,
    joinRequestsRejected : Number,
    joinRequestsPending : Number,
    joinCode : String,
    joinCodeExpiryDate : String,
    joinCodeExpiryDateTimeStamp : Number,
    joinCodeRequired : Boolean,
    acceptJoinRequests : Boolean,
    acceptJoinRequestsAutomatically : Boolean,
    acceptJoinCode : Boolean,
    acceptJoinCodeAutomatically : Boolean,
    // premium , standard , free - account type
    accountType : String,
});

module.exports = mongoose.model("Group" , groupSchema , "Group");