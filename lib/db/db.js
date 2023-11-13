const mongoose = require("mongoose");
const User = require("../schemas/user.js");
const dotenv = require("dotenv");
// const Task = require("../schemas/task.js");
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

let success = (data)=>{
    if(data == null || data == undefined) return true;
    else return data;
}
let error = (err)=>{
    if(error == null || err == undefined) return false;
    else return err;
}

//CRUD for users

let createUser = (user)=>{
    let newUser = new User(user);
    return newUser.save().then(success  ,error);
}
exports.createUser = createUser;

let getUserById  = (id)=>{
    return User.findById(id);
}
exports.getUserById = getUserById;

let getUser = (query)=>{
    return User.findOne(query);
}
exports.getUser = getUser;

let getUsers = (query)=>{
    return User.find(query);
}
exports.getUsers = getUsers;

let updateUserById = (id , fields)=>{
    User.findByIdAndUpdate(id , fields).then(success , error);
}
exports.updateUserById = updateUserById;

let updateUser = (query , fields)=>{
    User.findOneAndUpdate(query , fields).then(success , error);
}
exports.updateUser = updateUser;

let updateUsers = (query , fields)=>{
    let users = User.find(query);
    users.forEach((user)=>{
        user = Object.assign(user , fields);
        user.save();
    });
}
exports.updateUsers = updateUsers;

let deleteUserById = (id)=>{
    User.findByIdAndDelete(id).then(success , error);
}
exports.deleteUserById = deleteUserById;

let deleteUser = (query)=>{
    User.findOneAndDelete(query).then(success , error);
}
exports.deleteUser = deleteUser;

let deleteUsers = (query)=>{
    let users = User.find(query);
    users.forEach((user)=>{
        user.delete();
    });
}
exports.deleteUsers = deleteUsers;

//CRUD for tasks

// let createTask = (task)=>{
//     let newTask = new Task(task);
//     return newTask.save().then(success , error);
// }
// exports.createTask = createTask;

// let getTaskById = (id)=>{
//     return Task.findById(id);
// }
// exports.getTaskById = getTaskById;

// let getTask = (query)=>{
//     return Task.findOne(query);
// }
// exports.getTask = getTask;

// let getTasks = (query)=>{
//     return Task.find(query);
// }
// exports.getTasks = getTasks;

// let updateTaskById = (id , fields)=>{
//     Task.findByIdAndUpdate(id , fields).then(success , error);
// }
// exports.updateTaskById = updateTaskById;

// let updateTask = (query , fields)=>{
//     Task.findOneAndUpdate(query , fields).then(success , error);
// }
// exports.updateTask = updateTask;

// let updateTasks = (query , fields)=>{
//     let tasks = Task.find(query);
//     tasks.forEach((task)=>{
//         task = Object.assign(task , fields);
//         task.save();
//     });
// }
// exports.updateTasks = updateTasks;

// let deleteTaskById = (id)=>{
//     Task.findByIdAndDelete(id).then(success , error);
// }
// exports.deleteTaskById = deleteTaskById;

// let deleteTask = (query)=>{
//     Task.findOneAndDelete(query).then(success , error);
// }
// exports.deleteTask = deleteTask;

// let deleteTasks = (query)=>{
//     let tasks = Task.find(query);
//     tasks.forEach((task)=>{
//         task.delete();
//     });
// }
// exports.deleteTasks = deleteTasks;

// //CRUD for joinRequests

// let createJoinRequest = (joinRequest)=>{
//     let newJoinRequest = new JoinRequest(joinRequest);
//     return newJoinRequest.save().then(success , error);
// }
// exports.createJoinRequest = createJoinRequest;

// let getJoinRequestById = (id)=>{
//     return JoinRequest.findById(id);
// }
// exports.getJoinRequestById = getJoinRequestById;

// let getJoinRequest = (query)=>{
//     return JoinRequest.findOne(query);
// }
// exports.getJoinRequest = getJoinRequest;

// let getJoinRequests = (query)=>{
//     return JoinRequest.find(query);
// }
// exports.getJoinRequests = getJoinRequests;

// let updateJoinRequestById = (id , fields)=>{
//     return JoinRequest.findByIdAndUpdate(id , fields).then(success , error);
// }
// exports.updateJoinRequestById = updateJoinRequestById;

// let updateJoinRequest = (query , fields)=>{
//     return JoinRequest.findOneAndUpdate(query , fields).then(success , error);
// }
// exports.updateJoinRequest = updateJoinRequest;

// let updateJoinRequests = (query , fields)=>{
//     let joinRequests = JoinRequest.find(query);
//     joinRequests.forEach((joinRequest)=>{
//         joinRequest = Object.assign(joinRequest , fields);
//         joinRequest.save();
//     });
// }
// exports.updateJoinRequests = updateJoinRequests;

// let deleteJoinRequestById = (id)=>{
//     return JoinRequest.findByIdAndDelete(id).then(success , error);
// }
// exports.deleteJoinRequestById = deleteJoinRequestById;

// let deleteJoinRequest = (query)=>{
//     return JoinRequest.findOneAndDelete(query).then(success , error);
// }
// exports.deleteJoinRequest = deleteJoinRequest;

// let deleteJoinRequests = (query)=>{
//     let joinRequests = JoinRequest.find(query);
//     joinRequests.forEach((joinRequest)=>{
//         joinRequest.delete();
//     });
// }
// exports.deleteJoinRequests = deleteJoinRequests;

// //CRUD for joinCodes

// let createJoinCode = (joinCode)=>{
//     let newJoinCode = new JoinCode(joinCode);
//     return newJoinCode.save().then(success , error);
// }
// exports.createJoinCode = createJoinCode;

// let getJoinCodeById = (id)=>{
//     return JoinCode.findById(id);
// }
// exports.getJoinCodeById = getJoinCodeById;

// let getJoinCode = (query)=>{
//     return JoinCode.findOne(query);
// }
// exports.getJoinCode = getJoinCode;

// let getJoinCodes = (query)=>{
//     return JoinCode.find(query);
// }
// exports.getJoinCodes = getJoinCodes;

// let updateJoinCodeById = (id , fields)=>{
//     return JoinCode.findByIdAndUpdate(id , fields).then(success , error);
// }
// exports.updateJoinCodeById = updateJoinCodeById;

// let updateJoinCode = (query , fields)=>{
//     return JoinCode.findOneAndUpdate(query , fields);
// }
// exports.updateJoinCode = updateJoinCode;

// let updateJoinCodes = (query , fields)=>{
//     return JoinCode.find(query).then((joinCodes)=>{
//         joinCodes.forEach((joinCode)=>{
//             joinCode = Object.assign(joinCode , fields);
//             joinCode.save();
//         });
//     }).then(success , error);
// }
// exports.updateJoinCodes = updateJoinCodes;

// let deleteJoinCodeById = (id)=>{
//     return JoinCode.findByIdAndDelete(id).then(success , error);
// }
// exports.deleteJoinCodeById = deleteJoinCodeById;

// let deleteJoinCode = (query)=>{
//     return JoinCode.findOneAndDelete(query).then(success , error);
// }
// exports.deleteJoinCode = deleteJoinCode;

// let deleteJoinCodes = (query)=>{
//     return JoinCode.find(query).then((joinCodes)=>{
//         joinCodes.forEach((joinCode)=>{
//             joinCode.delete();
//         });
//     }).then(success , error);
// }
// exports.deleteJoinCodes = deleteJoinCodes;

// //CRUD for groups

// let createGroup = (group)=>{
//     let newGroup = new Group(group);
//     return newGroup.save().then(success , error);
// }
// exports.createGroup = createGroup;

// let getGroupById = (id)=>{
//     return Group.findById(id);
// }
// exports.getGroupById = getGroupById;

// let getGroup = (query)=>{
//     return Group.findOne(query);
// }
// exports.getGroup = getGroup;

// let getGroups = (query)=>{
//     return Group.find(query);
// }
// exports.getGroups = getGroups;

// let updateGroupById = (id , fields)=>{
//     return Group.findByIdAndUpdate(id , fields).then(success , error);
// }
// exports.updateGroupById = updateGroupById;

// let updateGroup = (query , fields)=>{
//     return Group.findOneAndUpdate(query , fields).then(success , error);
// }
// exports.updateGroup = updateGroup;

// let updateGroups = (query , fields)=>{
//     return Group.find(query).then((groups)=>{
//         groups.forEach((group)=>{
//             group = Object.assign(group , fields);
//             group.save();
//         });
//     }).then(success , error);
// }

// let deleteGroupById = (id)=>{
//     return Group.findByIdAndDelete(id).then(success , error);
// }
// exports.deleteGroupById = deleteGroupById;

// let deleteGroup = (query)=>{
//     return Group.findOneAndDelete(query).then(success , error);
// }
// exports.deleteGroup = deleteGroup;

// let deleteGroups = (query)=>{
//     return Group.find(query).then((groups)=>{
//         groups.forEach((group)=>{
//             group.delete();
//         });
//     }).then(success , error);
// }
// exports.deleteGroups = deleteGroups;

// //CRUD for events