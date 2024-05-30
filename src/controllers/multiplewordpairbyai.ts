import { Request, Response } from "express";
import { getMultipleWordPairs } from "../functions/easyReadOpenAI";

export class MultipleWordPairController {
  getWordPairs = async (req: Request, res: Response) => {
    const wordPairList: Array<any> | any = req.body.wordPairList;
    const text: any = req.body.text;
    return getMultipleWordPairs(text, wordPairList)
      .then(async (wordpairs) => {
        return res.status(200).send(wordpairs);
      })
      .catch((error) => {
        return res.status(401).send(error.message);
      });
  };
}
