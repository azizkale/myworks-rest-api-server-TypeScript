import express from "express";
import bodyParser from "body-parser";
import { MultipleWordPairController } from "../controllers/multiplewordpairbyai";
import { WordPairsFromChatGPTService } from "../services/WordPairsFromChatGPTService";

const wordPairsFromChatGTPService = new WordPairsFromChatGPTService();

const router = express.Router();
const multipWordPairsController = new MultipleWordPairController(
  wordPairsFromChatGTPService
);
router.use(bodyParser.json());

router.post("/getwordpairs", multipWordPairsController.getWordPairs);

export default router;
