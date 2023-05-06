import { getDatabase, ref, set } from "firebase/database";
import * as admin from "firebase-admin";
import { Chapter } from "./Chapter";
import { from, of } from "rxjs";

export class WordPair {
    wordPairId: any;
    word: string;
    meaning: string;
    chapterId: any
    pirId: any;
    editorId: any

    constructor(word: string, meaning: string, chapterId: any, pirId: any, editorId: any) {
        this.word = word;
        this.meaning = meaning
        this.chapterId = chapterId
        this.pirId = pirId
        this.editorId = editorId
    }

    async createWordPair(wordPair: WordPair) {
        const db = getDatabase();
        await set(ref(db, 'pir/' + wordPair.pirId + '/chapters/' + wordPair.chapterId + '/wordPairs/' + wordPair.wordPairId), wordPair);
    }

    async updateWordPair(wordPair: WordPair) {
        const db = admin.database();
        const ref = db.ref('pir/' + wordPair.pirId + '/chapters/' + wordPair.chapterId + '/wordPairs/' + wordPair.wordPairId);

        return ref.update(wordPair)
            .then((ress) => {
                return { ress }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    //async retrieveAllWordPairsOfSinglePir_(pirId: any) {
    // const nodeRef = admin.database().ref('pir/' + pirId + '/chapters');
    // // Read the data at the node once
    // await nodeRef.once('value', async (snapshot) => {
    //     if (snapshot.exists()) {
    //         const chapters = snapshot.val();
    //         let wordpairs: any[] = []
    //         await Object.values(chapters).map((data: any) => {
    //             wordpairs.push(data.wordPairs)
    //         })
    //         return await (wordpairs)
    //     } else {
    //         return null
    //     }
    // }, (error) => {
    //     return { error: error }
    // });
    //}
}