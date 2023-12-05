const Group = require("../../schemas/group.js");
const User = require("../../schemas/user.js");
const email = require("../email/email.js");

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
let createGroup = (req , res , next)=>{
    let group = new Group({
        name : req.body.name,
        description : req.body.description,
        members : req.body.members,
        owner : req.user._id,
        visibility : req.body.visibility,
        parentGroup : req.body.parentGroup,
        joinCodeRequired : req.body.joinCodeRequired,
        acceptJoinRequests : req.body.acceptJoinRequests,
        acceptJoinRequestsAutomatically : req.body.acceptJoinRequestsAutomatically,
        acceptJoinCode : req.body.acceptJoinCode,
        acceptJoinCodeAutomatically : req.body.acceptJoinCodeAutomatically,
    });
    if(group.name == "" || group.name == null || group.members == null){
        res.status(400);
        res.send("Empty group name or members");
        return;
    }
    //default values if not provided
    if(group.visibility == "" || group.visibility == null){
        group.visibility = "private";
    }
    if(group.joinCodeRequired == null){
        group.joinCodeRequired = false;
    }
    if(group.acceptJoinRequests == null){
        group.acceptJoinRequests = false;
    }
    if(group.acceptJoinRequestsAutomatically == null){
        group.acceptJoinRequestsAutomatically = false;
    }
    if(group.acceptJoinCode == null){
        group.acceptJoinCode = false;
    }
    if(group.acceptJoinCodeAutomatically == null){
        group.acceptJoinCodeAutomatically = false;
    }
    let creationDate = new Date();
    group.creationDate = creationDate.toDateString();
    group.creationTime = creationDate.getTime();
    group.childGroups = [];
    group.childGroupsCount = 0;
    //add owner to admins and members
    group.members.push(req.user._id);
    group.membersCount = req.body.members.length;
    group.admins = [];
    group.adminsCount = group.admins.length;
    group.tasks = [];
    group.tasksCount = 0;
    group.events = [];
    group.eventsCount = 0;
    group.comments = [];
    group.commentsCount = 0;
    group.attachments = [];
    group.attachmentsCount = 0;
    group.joinRequests = [];
    group.joinRequestsCount = 0;
    group.joinRequestsAccepted = 0;
    group.joinRequestsRejected = 0;
    group.joinRequestsPending = 0;
    if(!req.body.joinCodeRequired){
        group.joinCode = undefined;
        group.joinCodeExpiryDate = undefined;
        group.joinCodeExpiryDateTimeStamp = undefined;
    }
    if(!req.body.acceptJoinRequests){
        group.acceptJoinRequestsAutomatically = false;
    }
    group.accountType = "free";

    //add group to owner's groups and members groups
    User.findById(req.user._id).then(dbUser =>{
        dbUser.groups.push(group._id);
        dbUser.save().then(() =>{
            email.sendTextMail(dbUser.defaultEmail , "Group created" , "The group " + group.name + " has been created");
        });
    });
    group.members.forEach(member =>{
        User.findById(member).then(dbMember =>{
            dbMember.groups.push(group._id);
            dbMember.save().then(() =>{
                email.sendTextMail(dbMember.defaultEmail , "Group created" , "The group " + group.name + " has been created, and you have been added to it");
            });
        });
    });
    
    group.save().then(dbGroup =>{
        res.status(200);
        res.send(dbGroup);
    }).catch(err =>{
        console.log(err);
        next(err , req , res);
    });
}
exports.createGroup = createGroup;

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

let getGroup = (req , res , next)=>{
    Group.findById(req.params.groupId).then(dbGroup =>{
        if(!dbGroup){
            res.status(404);
            res.send("Group not found");
            return;
        }
        if(dbGroup.owner == req.user._id || dbGroup.admins.includes(req.user._id) || dbGroup.members.includes(req.user._id)){
            res.status(200);
            res.send(dbGroup);
        }
        else if(dbGroup.visibility == "public"){
            res.status(200);
            res.send(dbGroup);
        }
        else{
            res.status(403);
            res.send("You are not authorized to perform this action");
        }
    }).catch(err =>{
        console.log(err);
        next(err , req , res);
    });
}
exports.getGroup = getGroup;

let getGroups = (req , res , next)=>{
    Group.find({$or : [{owner : req.user._id} , {admins : req.user._id} , {members : req.user._id}]}).then(dbGroups =>{
        res.status(200);
        res.send(dbGroups);
    }).catch(err =>{
        console.log(err);
        next(err , req , res);
    });
}
exports.getGroups = getGroups;

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

let updateGroup = (req , res , next)=>{
    Group.findById(req.params.groupId).then(dbGroup =>{
        if(!dbGroup){
            res.status(404);
            res.send("Group not found");
            return;
        }
        if(dbGroup.owner == req.user._id || dbGroup.admins.includes(req.user._id)){
            Object.assign(dbGroup , req.body);
            dbGroup.save().then(dbGroup =>{
                res.status(200);
                res.send(dbGroup);
            }).catch(err =>{
                console.log(err);
                next(err , req , res);
            });

        }
        else{
            res.status(403);
            res.send("You are not authorized to perform this action");
        }
    });
}
exports.updateGroup = updateGroup;

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

let deleteGroup = (req , res , next)=>{
    Group.findById(req.params.groupId).then(async dbGroup =>{
        if(!dbGroup){
            res.status(404);
            res.send("Group not found");
            return;
        }
        if(dbGroup.owner == req.user._id){
            dbGroup.members.forEach(async member =>{
                 await User.findById(member).then(dbMember =>{
                    dbMember.groups.splice(dbMember.groups.indexOf(dbGroup._id) , 1);
                    dbMember.save().then(() =>{
                        email.sendTextMail(dbMember.defaultEmail , "Group deleted" , "The group " + dbGroup.name + " has been deleted by the owner");
                    });
                });
                
            });
            dbGroup.deleteOne().then(()=>{
                res.status(200);
                res.send("Group deleted successfully");
            }).catch(err =>{
                console.log(err);
                next(err , req , res);
            });
        }
        else{
            res.status(403);
            res.send("You are not authorized to perform this action");
        }
    });
}
exports.deleteGroup = deleteGroup;

let addMember = (req , res , next)=>{
    Group.findById(req.params.groupId).then(dbGroup =>{
        if(!dbGroup){
            res.status(404);
            res.send("Group not found");
            return;
        }
        if(dbGroup.owner == req.user._id || dbGroup.admins.includes(req.user._id)){
            if(!dbGroup.members.includes(req.body.member)){
                dbGroup.members.push(req.body.member);
                dbGroup.membersCount = dbGroup.members.length;
                dbGroup.save().then(dbGroup =>{
                    res.status(200);
                    res.send(dbGroup);
                }).catch(err =>{
                    console.log(err);
                    next(err , req , res);
                });
            }
        }
        else{
            res.status(403);
            res.send("You are not authorized to perform this action");
        }
    });
}
exports.addMember = addMember;

let removeMember = (req , res , next)=>{
    Group.findById(req.params.groupId).then(dbGroup =>{
        if(!dbGroup){
            res.status(404);
            res.send("Group not found");
            return;
        }
        if(dbGroup.owner == req.user._id || dbGroup.admins.includes(req.user._id)){
            if(dbGroup.members.includes(req.params.memberId)){
                dbGroup.members.splice(dbGroup.members.indexOf(req.params.memberId) , 1);
                dbGroup.membersCount = dbGroup.members.length;
                dbGroup.save().then(dbGroup =>{
                    res.status(200);
                    res.send(dbGroup);
                }).catch(err =>{
                    console.log(err);
                    next(err , req , res);
                });
            }
        }
        else{
            res.status(403);
            res.send("You are not authorized to perform this action");
        }
    });
}
exports.removeMember = removeMember;

let addAdmin = (req , res , next)=>{
    Group.findById(req.params.groupId).then(dbGroup =>{
        if(!dbGroup){
            res.status(404);
            res.send("Group not found");
            return;
        }
        if(dbGroup.owner == req.user._id){
            if(!dbGroup.admins.includes(req.body.admin)){
                dbGroup.admins.push(req.body.admin);
                dbGroup.adminsCount = dbGroup.admins.length;
                dbGroup.save().then(dbGroup =>{
                    res.status(200);
                    res.send(dbGroup);
                }).catch(err =>{
                    console.log(err);
                    next(err , req , res);
                });
            }
        }
        else{
            res.status(403);
            res.send("You are not authorized to perform this action");
        }
    });
}
exports.addAdmin = addAdmin;

let removeAdmin = (req , res , next)=>{
    Group.findById(req.params.groupId).then(dbGroup =>{
        if(!dbGroup){
            res.status(404);
            res.send("Group not found");
            return;
        }
        if(dbGroup.owner == req.user._id){
            if(dbGroup.admins.includes(req.params.adminId)){
                dbGroup.admins.splice(dbGroup.admins.indexOf(req.params.adminId) , 1);
                dbGroup.adminsCount = dbGroup.admins.length;
                dbGroup.save().then(dbGroup =>{
                    res.status(200);
                    res.send(dbGroup);
                }).catch(err =>{
                    console.log(err);
                    next(err , req , res);
                });
            }
        }
        else{
            res.status(403);
            res.send("You are not authorized to perform this action");
        }
    });
}
exports.removeAdmin = removeAdmin;

let addParentGroup = (req , res , next)=>{
    Group.findById(req.params.groupId).then(dbGroup =>{
        if(!dbGroup){
            res.status(404);
            res.send("Group not found");
            return;
        }
        if(dbGroup.owner == req.user._id){
            if(!dbGroup.parentGroup){
                dbGroup.parentGroup = req.body.parentGroup;
                dbGroup.save().then(dbGroup =>{
                    res.status(200);
                    res.send(dbGroup);
                }).catch(err =>{
                    console.log(err);
                    next(err , req , res);
                });
            }
        }
        else{
            res.status(403);
            res.send("You are not authorized to perform this action");
        }
    });
}
exports.addParentGroup = addParentGroup;

let removeParentGroup = (req , res , next)=>{
    Group.findById(req.params.groupId).then(dbGroup =>{
        if(!dbGroup){
            res.status(404);
            res.send("Group not found");
            return;
        }
        if(dbGroup.owner == req.user._id){
            if(dbGroup.parentGroup){
                dbGroup.parentGroup = undefined;
                dbGroup.save().then(dbGroup =>{
                    res.status(200);
                    res.send(dbGroup);
                }).catch(err =>{
                    console.log(err);
                    next(err , req , res);
                });
            }
        }
        else{
            res.status(403);
            res.send("You are not authorized to perform this action");
        }
    });
}
exports.removeParentGroup = removeParentGroup;