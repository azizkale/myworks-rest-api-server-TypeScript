import express from "express";
import bodyParser from "body-parser";
import { GroupController } from "../controllers/groupcontrollers";
import { GroupService } from "../services/groupservice";
import tokenControl from "../middlewares/checkTokenExpiration";

const router = express.Router();
const groupService = new GroupService();
const groupController = new GroupController(groupService);

router.use(bodyParser.json());
router.post("/group/creategroup", [tokenControl], groupController.createGroup);
router.get(
  "/group/retrievegroups",
  [tokenControl],
  groupController.retrieveGroups
);
router.patch("/group/updategroup", [tokenControl], groupController.updateGroup);
router.delete(
  "/group/deletegroup",
  [tokenControl],
  groupController.deleteGroup
);
router.get(
  "/group/retrieveallgroupsnamesoftheuserbyuserid",
  [tokenControl],
  groupController.retrieveAllGroupsNamesOfTheUserByuserId
);
router.get(
  "/group/retrievesinglegroupofuserbygroupid",
  [tokenControl],
  groupController.retrieveSingleGroupOfUserByGroupId
);
router.get(
  "/group/retrieveallparticipantsofthegroupbygroupid",
  tokenControl,
  groupController.retrieveAllParticipantsOfThegroupByGroupId
);
router.get(
  "/group/retrieveallgroupsofthementor",
  tokenControl,
  groupController.retrieveAllGroupsOfTheMentor
);
router.delete(
  "/group/deleteparticipantfromgroup",
  tokenControl,
  groupController.deleteParticipantFromGroup
);

export default router;
