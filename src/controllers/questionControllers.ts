import { Question } from "../models/Question";
import { QuestionService } from "../services/questionService";
import { Request, Response } from "express";

export class QuestionController {
  private questionService: QuestionService;

  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }
  createQuestion = async (req: Request, res: Response) => {
    let newQuestion: Question = req.body.question;

    if (newQuestion.questionId !== null) {
      this.questionService
        .createQuestion(newQuestion)
        .then(() => {
          res.status(200).send(newQuestion);
        })
        .catch((err) => {
          return res.status(409).send({ error: err.message });
        });
    }
  };
}
