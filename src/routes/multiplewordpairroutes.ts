import express from "express";
import bodyParser from "body-parser";
import { MultipleWordPairController } from "../controllers/multiplewordpairbyai";

const router = express.Router();
const multipWordPairsController = new MultipleWordPairController();
router.use(bodyParser.json());

router.post("/getwordpairs", multipWordPairsController.getWordPairs);

export default router;
