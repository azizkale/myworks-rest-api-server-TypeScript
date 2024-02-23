import express from "express";
import bodyParser from "body-parser";
import { QuestionController } from "../controllers/questionControllers";
import { QuestionService } from "../services/questionService";

const router = express.Router();
const questonService = new QuestionService();
const questionController = new QuestionController(questonService);
router.use(bodyParser.json());
router.post("/question/create", questionController.createQuestion);

export default router;
