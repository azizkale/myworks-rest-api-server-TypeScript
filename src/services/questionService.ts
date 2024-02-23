import { getDatabase, ref, set } from "firebase/database";
import { Question } from "../models/Question";

const db = getDatabase();

export class QuestionService {
  async createQuestion(question: Question) {
    await set(
      ref(
        db,
        "pirs/" +
          question.pirId +
          "/chapters/" +
          question.chapterId +
          "/questions/" +
          question.questionId
      ),
      question
    );
  }
}
