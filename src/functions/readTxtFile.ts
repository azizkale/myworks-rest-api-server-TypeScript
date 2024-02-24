import { from, Observable } from "rxjs";
import { map, filter } from "rxjs/operators";
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
    map((lines) => lines.filter((line) => line !== "" && line.length >= 5)),
    map((filteredLines) =>
      filteredLines.map((line) => extractContentBeforeFirstBracket(line))
    )
  );
};

// Yardımcı fonksiyon
const extractContentBeforeFirstBracket = (line: string): string => {
  const match = line.match(/[\[\(]/);
  return match ? line.substring(0, match.index).trim() : line;
};

readTxtFile().subscribe(
  (extractedContents) => {
    console.log("Extracted Contents:", extractedContents);
  },
  (error) => console.error(`Error reading file: ${error}`)
);

readTxtFile().subscribe(
  (resultLines) => {
    const outputPath: string = "src/functions/word.txt";
    const linesToWrite = resultLines.join("\n");

    fs.writeFile(outputPath, linesToWrite, (err) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
      } else {
        console.log(`New file "${outputPath}" created successfully.`);
      }
    });
  },
  (error) => console.error(`Error reading file: ${error}`)
);
