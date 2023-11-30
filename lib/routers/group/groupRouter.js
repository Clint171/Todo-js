const express = require("express");
const bodyParser = require("body-parser");
const groupService = require("../../service/group/groupService.js");
const auth = require("../../service/user/auth.js");
const router = express.Router();

router.use(bodyParser.urlencoded({
    extended: false
}));

router.use(auth);

router.post("/" , groupService.createGroup);

router.get("/" , groupService.getGroups);

router.get("/:groupId" , groupService.getGroup);

router.put("/:groupId" , groupService.updateGroup);

router.delete("/:groupId" , groupService.deleteGroup);

router.post("/:groupId/members" , groupService.addMember);

router.delete("/:groupId/members/:memberId" , groupService.removeMember);

router.post("/:groupId/admins" , groupService.addAdmin);

router.delete("/:groupId/admins/:adminId" , groupService.removeAdmin);

router.post("/:groupId/parentGroup" , groupService.addParentGroup);

router.delete("/:groupId/parentGroup/:parentGroupId" , groupService.removeParentGroup);

module.exports = router;