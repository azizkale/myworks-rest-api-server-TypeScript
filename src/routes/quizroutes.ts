import express from "express";
import bodyParser from "body-parser";
import { QuizController } from "../controllers/quizControllers";

const router = express.Router();
const quizController = new QuizController();
router.use(bodyParser.json());
router.get("/quiz/create", quizController.createQuestion);

export default router;
