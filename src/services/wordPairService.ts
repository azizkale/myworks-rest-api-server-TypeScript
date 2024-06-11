import { getDatabase, set, ref } from "firebase/database";
import * as admin from "firebase-admin";
import { from, toArray } from "rxjs";
import { WordPair } from "../models/WordPair";
import { db2 } from "../tools/firebaseAdminInitialization";

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

    await db2
      .ref(
        "pirs/" +
          wordPair.pirId +
          "/chapters/" +
          wordPair.chapterId +
          "/wordPairs/" +
          wordPair.wordPairId
      )
      .set(wordPair);
  }

  async retrieveAllWordPairsOfTheChapter(pirId: any, chapterId: any) {
    return new Promise<any[]>((resolve, reject) => {
      const nodeRef = admin
        .database()
        .ref("pirs/" + pirId + "/chapters/" + chapterId + "/wordPairs");
      // Read the data at the node once
      nodeRef.once("value", (snapshot) => {
        if (snapshot.exists()) {
          const wordPairs = snapshot.val();
          from(Object.values(wordPairs))
            .pipe(
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
