import axios from "axios";
import { Request, Response } from "express";

import { interval } from "rxjs";
import { take } from "rxjs/operators";
import * as fs from "fs";
const text =
  "Öyle ki, bu engin hazlarla coşan namaz kahramanı, doyma bilmeyen bir hisle, kemmiyet ve keyfiyet sınırlarının üstünde, niyetle derinleştirip sonsuzlaştırdığı; yakîniyle Hak’la irtibatlandırıp hulûsuyla ebedîleştirdiği, mal, can ve bütün ilâhî mevhibeler adına Hakk’a karşı minnet borcunu edaya yönelir; gönlünün bütün duyarlılığıyla Allah’ı anar ve inler.. Nebî’yi yâd eder, içi inşirahla dolar.. kendisiyle aynı mutluluğu paylaşan insanları düşünür, hayır dualarıyla gürler.. ve tekbirlerle başlattığı bu miraç yolculuğunu, dinin temeli sayılan şehadetlerle noktalar";

export const lugat = async (req: Request, res: Response) => {
  const words = text.split(" ");
  let arr: string[] = [];

  interval(3000)
    .pipe(take(words.length))
    .subscribe((index) => {
      const word = words[index];
      console.log(word);
      axios
        .get(
          "https://lugat.osmanlica.online/?kelime=" +
            word +
            "&kaynak=browser&sadecehattikuran=false&filitre=Luggat,arap%C3%A7a%20kelimeler&manadaara=false&json=True"
        )
        .then((response: any) => {
          if (response.data ?? false) {
            arr.push(response.data);
            console.log(response.data);
            const filePath = "file.txt";

            const dataString = response.data.join("\n");

            // Append data to the file
            // fs.appendFileSync(filePath, dataString + "\n");
          } else {
            console.log(word + " kelimesinin anlamı bulunamadı");
          }
        })
        .catch((error: any) => {
          console.error(`Error: ${error.message}`);
        });
    });
};
