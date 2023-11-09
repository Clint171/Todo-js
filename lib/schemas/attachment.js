const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const attachmentSchema = new Schema({
    taskId : {type: Schema.Types.ObjectId, ref: 'Task', required: true},
    ownerId : {type: Schema.Types.ObjectId, ref: 'User', required: true},
    editors : [{type: Schema.Types.ObjectId, ref: 'User', required: false}],
    title : String,
    description : String,
    creationDate : String,
    creationTime : String,
    visibility: String,
    url : String,
    type : String,
    extension : String,
    size : String,
    sizeInBytes : Number,
    sizeInKilobytes : Number,
    sizeInMegabytes : Number,
    sizeInGigabytes : Number,
    sizeString : String,
    sizeInBytesString : String,
    sizeInKilobytesString : String,
    sizeInMegabytesString : String,
    sizeInGigabytesString : String,
});

module.exports = mongoose.model("Attachment" , attachmentSchema , "Attachment");