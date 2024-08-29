import { from, Observable } from "rxjs";
import { map, filter } from "rxjs/operators";
import * as fs from "fs";

interface WordPair {
  word: string;
  meaning: string;
}

export const readTxtFile = (): Observable<WordPair[]> => {
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
    map((filteredLines) => filteredLines.map((line) => createWordPair(line)))
  );
};

// Yardımcı fonksiyon
const createWordPair = (line: string): WordPair => {
  const match: any = line.match(/[\[\(](.*?)[\]\)]/);
  const word = match ? line.substring(0, match.index).trim() : line;
  const meaning: any = match
    ? removeBrackets(line, match.index + match[0].length).trim()
    : "";
  return { word, meaning };
  return { word, meaning };
};

const removeBrackets = (line: string, startIndex: number): string => {
  let endIndex = line.indexOf("]", startIndex);
  if (endIndex === -1) {
    endIndex = line.indexOf(")", startIndex);
  }
  return endIndex !== -1
    ? line.substring(0, startIndex) + line.substring(endIndex + 1)
    : line;
};

readTxtFile().subscribe(
  (wordPairs) => {
    console.log("Word Pairs:", wordPairs);

    // JSON nesnelerini içeren bir array'i birleştirip bir dosyaya yazma işlemi
    const outputPath: string = "src/functions/word_pairs.json";
    const content = JSON.stringify(wordPairs, null, 2);

    fs.writeFile(outputPath, content, (err) => {
      if (err) {
        console.error(`Error writing file: ${err}`);
      } else {
        console.log(`New file "${outputPath}" created successfully.`);
      }
    });
  },
  (error) => console.error(`Error reading file: ${error}`)
);
