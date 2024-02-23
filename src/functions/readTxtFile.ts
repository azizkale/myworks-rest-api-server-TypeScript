import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as fs from "fs";

export const readTxtFile = (): Observable<string[]> => {
  const filePath: string = "src/functions/db.txt";

  return from(
    new Promise<string>((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    })
  ).pipe(
    map((data) => data.split("\n").map((line) => line.trim())),
    map((lines) => lines.filter((line) => line !== "" && line.length >= 5))
  );
};

readTxtFile().subscribe(
  (lines) => console.log("File content:", lines),
  (error) => console.error(`Error reading file: ${error}`)
);
