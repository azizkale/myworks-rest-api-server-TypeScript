import express from "express";
import { PirController } from "../controllers/pircontrollers";
import { PirService } from "../services/pirService";
import bodyParser from "body-parser";
import { GroupService } from "../services/groupservice";

const router = express.Router();
const groupService = new GroupService();
const pirService = new PirService(groupService);
const pirController = new PirController(pirService);

router.use(bodyParser.json());
router.get("/display/retrievepirs", pirController.retrievePirsNames);
router.get(
  "/display/retrievechaptersnamesbypirid",
  pirController.retrieveChaptersNamesByPirId
);
router.get(
  "/display/retrievechapterbychapterid",
  pirController.retrieveChaptersByChapterId
);

export default router;
