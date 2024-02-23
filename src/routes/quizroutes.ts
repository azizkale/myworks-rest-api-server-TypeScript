import express from "express";
import bodyParser from "body-parser";

const router = express.Router();
router.use(bodyParser.json());
router.get("/quiz/create", quizController.getWordOfMeaning);

export default router;
