import { Request, Response } from "express";
import { getMultipleWordPairs } from "../functions/easyReadOpenAI";

const words = [
  {
    word: "mukaddime",
    meaning: "başlangıç, giriş",
  },
  {
    word: "risalet",
    meaning: "peygamberlik",
  },
  {
    word: "hilaf-ı vaki",
    meaning: "gerçeğe aykırı, doğru olmayan",
  },
  {
    word: "timşal",
    meaning: "örnek, benzetme",
  },
  {
    word: "emîn",
    meaning: "güvenilir, sadık",
  },
  {
    word: "andelib-i zîşan",
    meaning: "cennet kuşu, doğruluk",
  },
  {
    word: "yekta",
    meaning: "biricik, eşsiz",
  },
  {
    word: "riayet",
    meaning: "bakım, koruma",
  },
  {
    word: "nebze",
    meaning: "nüve, başlangıç",
  },
  {
    word: "mürüvvet",
    meaning: "iyilik, lütuf",
  },
  {
    word: "ferd-i mutlak",
    meaning: "sınırsız şahıs",
  },
  {
    word: "muallâ",
    meaning: "yüce, yüksek",
  },
  {
    word: "mukabele",
    meaning: "karşılık, karşılıklı ilişki",
  },
];

export class MultipleWordPairController {
  getWordPairs = async (req: Request, res: Response) => {
    const { text, listWordPairs, chapterId, pirId, editorId } = req.body;

    // return res.status(200).send(words);
    return getMultipleWordPairs(text, listWordPairs, chapterId, pirId, editorId)

      .then(async (wordpairs) => {
        return res.status(200).send(wordpairs);
      })
      .catch((error) => {
        return res.status(401).send(error.message);
      });
  };
}
