import axios from "axios";
import { Request, Response } from "express";

export class LugatController {
  getWordOfMeaning = async (req: Request, res: Response) => {
    try {
      const word = req.query.word;

      if (!word) {
        return res
          .status(400)
          .send({ error: 'Missing "word" parameter in the query.' });
      }

      const response = await axios.get(
        `https://lugat.osmanlica.online/?kelime=${word}&kaynak=browser&sadecehattikuran=false&filitre=Luggat,arap%C3%A7a%20kelimeler&manadaara=false&json=True`
      );

      if (response.data ?? false) {
        res.send(response.data);
      } else {
        console.log(`${word} kelimesinin anlamı bulunamadı`);
        res.status(404).send({ error: "Word not found" });
      }
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
      res.status(500).send({ error: "Internal Server Error" });
    }
  };
}
