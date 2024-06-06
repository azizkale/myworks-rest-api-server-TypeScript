import express from "express";
import bodyParser from "body-parser";
import { MultipleWordPairController } from "../controllers/multiplewordpairbyai";
import { WordPairsFromChatGPTService } from "../services/WordPairsFromChatGPTService";
import { GroupService } from "../services/groupservice";
import { PirService } from "../services/pirService";

const groupService = new GroupService();
const pirService = new PirService(groupService);
const wordPairsFromChatGTPService = new WordPairsFromChatGPTService(pirService);

const router = express.Router();
const multipWordPairsController = new MultipleWordPairController(
  wordPairsFromChatGTPService
);
router.use(bodyParser.json());

router.post("/getwordpairs", multipWordPairsController.getWordPairs);

export default router;
