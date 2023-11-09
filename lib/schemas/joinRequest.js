const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const joinRequestSchema = new Schema({
    groupId : {type: Schema.Types.ObjectId, ref: 'Group', required: true},
    userId : {type: Schema.Types.ObjectId, ref: 'User', required: true},
    // pending, accepted, rejected - status
    status : String,
    creationDate : String,
    creationTime : String,
    // public, private, editors , group - visibility
    visibility: String,
    // owner, editor, viewer - role
    role : String,
});