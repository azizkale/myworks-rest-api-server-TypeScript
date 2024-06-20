import { Request, Response } from "express";
import { WordPairsFromChatGPTService } from "../services/WordPairsFromChatGPTService";

export class MultipleWordPairController {
  private wordPairsFromChatGTPService: WordPairsFromChatGPTService;

  constructor(wordPairsFromChatGTPService: WordPairsFromChatGPTService) {
    this.wordPairsFromChatGTPService = wordPairsFromChatGTPService;
  }

  getWordPairs = async (req: Request, res: Response) => {
    const { text, listWordPairs, chapterId, pirId, editorId } = req.body;
    return this.wordPairsFromChatGTPService
      .getMultipleWordPairs(text, listWordPairs, chapterId, pirId, editorId)
      .then(async (wordpairs) => {
        return res.status(200).send(wordpairs);
      })
      .catch((error) => {
        return res.status(401).send(error.message);
      });
  };
}
