const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const joinCodeSchema = new Schema({
    group : {type: Schema.Types.ObjectId, ref: 'Group', required: true},
    joinCode : String,
    joinCodeExpiryDate : String,
    joinCodeExpiryTime : String,
    joinCodeExpiryDateTime : String,
    joinCodeExpiryTimestamp : Number,
    joinCodeExpiryDateTimeStamp : Number,
    joinCodeRequired : Boolean,
    acceptJoinCode : Boolean,
    acceptJoinCodeAutomatically : Boolean,
    // // owner, editor, viewer - role
    joinCodeUserPrivilege : String,
});

module.exports = mongoose.model("JoinCode" , joinCodeSchema , "JoinCode");