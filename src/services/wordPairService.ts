import { getDatabase, set, ref } from "firebase/database";
import * as admin from "firebase-admin";
import { filter, from, mergeMap, toArray } from "rxjs";
import { WordPair } from "../models/WordPair";

const db = getDatabase();

export class WordPairService {
  async createWordPair(wordPair: WordPair) {
    const db = getDatabase();
    await set(
      ref(
        db,
        "pirs/" +
          wordPair.pirId +
          "/chapters/" +
          wordPair.chapterId +
          "/wordPairs/" +
          wordPair.wordPairId
      ),
      wordPair
    );
  }

  async retrieveAllWordPairsOfSinglePir(pirId: any): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const nodeRef = admin.database().ref("pirs/" + pirId + "/chapters");
      // Read the data at the node once
      nodeRef.once("value", (snapshot) => {
        if (snapshot.exists()) {
          const chapters = snapshot.val();
          return from(Object.values(chapters))
            .pipe(
              filter((chapter: any) => chapter.wordPairs), // Filter out chapters without wordPairs
              mergeMap((chapter: any) => Object.values(chapter.wordPairs)), // Merge all wordPairs into a single stream
              toArray() // Collect the wordPairs into an array
            )
            .subscribe({
              next: (arrWordPairs: any[]) => {
                return resolve(arrWordPairs);
              },
            });
        }
      });
    });
  }

  async updateWordPair(wordPair: WordPair) {
    const db = admin.database();
    const ref = db.ref(
      "pirs/" +
        wordPair.pirId +
        "/chapters/" +
        wordPair.chapterId +
        "/wordPairs/" +
        wordPair.wordPairId
    );

    return ref
      .update(wordPair)
      .then((ress) => {
        return { ress };
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        return { errror: error };
      });
  }

  async deleteWordPair(wordPair: WordPair) {
    const ref = await admin
      .database()
      .ref(
        "pirs/" +
          wordPair.pirId +
          "/chapters/" +
          wordPair.chapterId +
          "/wordPairs/"
      );
    return await ref.child(wordPair.wordPairId).remove();
  }
}
