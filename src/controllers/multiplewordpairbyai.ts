import { Request, Response } from "express";
import { getMultipleWordPairs } from "../functions/easyReadOpenAI";

export class MultipleWordPairController {
  getWordPairs = async (req: Request, res: Response) => {
    const { text, listWordPairs } = req.body;

    return getMultipleWordPairs(text, listWordPairs)
      .then(async (wordpairs) => {
        return res.status(200).send(wordpairs);
      })
      .catch((error) => {
        return res.status(401).send(error.message);
      });
  };
}
