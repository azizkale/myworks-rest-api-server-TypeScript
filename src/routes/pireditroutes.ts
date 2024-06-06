import express from "express";
import { PirEditController } from "../controllers/pireditcontrollers";
import { PirService } from "../services/pirService";
import { GroupService } from "../services/groupservice";
import { WordPairService } from "../services/wordPairService";
import bodyParser from "body-parser";
import tokenControl from "../middlewares/checkTokenExpiration";
import isAdmin from "../middlewares/isAdmin";

const router = express.Router();
const groupService = new GroupService();
const wordPairService = new WordPairService();
const pirService = new PirService(groupService);
const pirEditController = new PirEditController(pirService, wordPairService);

router.use(bodyParser.json());
router.post(
  "/pir/create",
  [tokenControl, isAdmin],
  pirEditController.createPir
);
// router.get('/pir/getpirs', tokenControl, pircontrollers.retrievePirs)
router.patch("/pir/updatepir", tokenControl, pirEditController.updatePir);
router.delete("/pir/deletepir", tokenControl, pirEditController.deletePir);

router.post("/pir/addchapter", tokenControl, pirEditController.createChapter);
router.get(
  "/pir/getchaptersbyeditorid",
  pirEditController.retrieveChaptersByEditorId
);
router.get("/pir/getallchapters", pirEditController.retrieveAllChapters);
router.patch(
  "/pir/updatechapter",
  tokenControl,
  pirEditController.updateChapter
);
router.delete(
  "/pir/deletechapter",
  tokenControl,
  pirEditController.deleteChapter
);

router.post(
  "/pir/createeditedwordpair",
  tokenControl,
  pirEditController.createWordPair
);
router.patch(
  "/pir/updatewordpair",
  tokenControl,
  pirEditController.updateWordPair
);
router.get(
  "/pir/getallwordpairsofsinglepir",
  pirEditController.retrieveAllWordPairsOfTheChapter
);
router.delete(
  "/pir/deletewordpair",
  tokenControl,
  pirEditController.deleteWordPair
);

router.get("/pir/retrievepirlist", pirEditController.retrievePirList);
router.post(
  "/pir/assignpirtogroup",
  tokenControl,
  pirEditController.assingPirToGroup
);
router.get("/pir/retrievepirbypirid", pirEditController.retrievePirByPirId);
router.patch(
  "/pir/leavepirfromgroup",
  tokenControl,
  pirEditController.leaveThePirFromTheGroup
);

export default router;
