import { getDatabase, ref, set } from "firebase/database";
import { Chapter } from "./Chapter";
import * as admin from "firebase-admin";
import { WordPair } from "./WordPair";
import { Group } from "./Group";
import { from, map, of, tap } from "rxjs";

const groupInstance = new Group(null, null)
const db = getDatabase();

export class Pir {
    pirId: any;
    editorId: any;
    name: string | any;
    description: string;
    assigned: boolean;
    chapters: Chapter[];
    wordPairs: WordPair[];
    groupId: any // which group edits the pir

    constructor(
        pirId: any,
        editorId: any,
        groupId: any,
        name: string | any,
        description: string,
        chapters: Chapter[],
        wordPairs: WordPair[]
    ) {
        this.pirId = pirId
        this.editorId = editorId
        this.groupId = groupId
        this.name = name
        this.description = description
        this.chapters = chapters
        this.wordPairs = wordPairs

    }


    //add a mew pir to node 'pirs' in db (pirlist)
    async createPir(pir: Pir) {
        await set(ref(db, 'pirs/' + pir.pirId), {
            pirId: pir.pirId,
            name: pir.name,
            description: pir.description,
        });
    }

    //this manipulates three nodes in DB
    async assignPirToGroup(pir: Pir) {

        //adds pir to the node 'pir' in db
        await set(ref(db, 'pir/' + pir.pirId), {
            pirId: pir.pirId,
            name: pir.name,
            description: pir.description,
            editorId: pir.editorId,
            groupId: pir.groupId
        }).then(async () => {
            //when a pir of pirlist is assigned, two nodes added to the pir in pirlist('pirs' in db)
            await this.addPirToTheNodeInDb(pir).then(async () => {
                await this.addAssignedPirToGroupsWorks(pir)
            })
        }).catch((error) => {
            console.error("Error updating data:", error);
            return { errror: error }
        });
    }

    //when a pir of pirlist assigned, it is added a two nodes to pir in pirlist('pirs' in db) / is used in assignPirToGroup(pir: Pir)
    async addPirToTheNodeInDb(pir: Pir) {
        const reff = admin.database().ref(`pirs/${pir.pirId}`);
        reff.update({
            assigned: true,
            groupId: pir.groupId
        })
            .then(() => {
                return { pir }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    //add assigned pir to groups works (works/pirs) / / is used in assignPirToGroup(pir: Pir)
    async addAssignedPirToGroupsWorks(pir: Pir) {
        const refff = admin.database().ref(`groups/${pir.groupId}/works/pirs/${pir.pirId}`);
        return refff.update({
            pirName: pir.name
        })
            .then(async () => {
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    async retrievePirByPirid(pirId: any) {
        const nodeRef = admin.database().ref(`pir/${pirId}`);
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                return data
            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async addChapterToPir(chapter: Chapter) {
        await set(ref(db, 'pir/' + chapter.pirId + '/chapters/' + chapter.chapterId), {
            chapterName: chapter.chapterName,
            chapterContent: chapter.chapterContent,
            editorId: chapter.editorId,
            pirId: chapter.pirId,
            createDate: chapter.createDate,
            chapterId: chapter.chapterId
        });
    }

    async retrievePirs() {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref('pir');
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async retrievePirList() {
        const nodeRef = admin.database().ref('pirs');
        const snapshot = await nodeRef.once('value');
        if (snapshot.exists()) {
            const data = snapshot.val();

            //adds groupname to assigned pirs
            const updatedData = await Promise.all(Object.values(data).map(async (pir: any) => {
                if (pir.assigned) {
                    const groupinfo: Group | any = await groupInstance.retrieveSingleGroupByGroupId(pir.groupId);
                    return { ...pir, groupName: groupinfo.val().groupName };
                }
                return { ...pir };
            }));
            return updatedData;
        } else {
            return null;
        }
    }

    async retrievePirsByPirEditorId(pirEditorId: any) {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref('pir');
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                const editorsPirs = (Object.values(data)).filter((pir: Pir) => pir.pirId.editorId === pirEditorId)
                return editorsPirs

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async updateChapter(chapter: Chapter) {
        const db = admin.database();
        const ref = db.ref('pir/' + chapter.pirId + '/chapters/' + chapter.chapterId);
        return ref.update(chapter)
            .then(() => {
                return { chapter }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    async updatePir(pir: Pir) {
        const db = admin.database();
        const ref = db.ref('pir/' + pir.pirId);
        return ref.update(pir)
            .then(() => {
                return { pir }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    async retrieveChaptersNamesByPirId(pirId: any) {
        const nodeRef = admin.database().ref('pir/' + pirId);
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async retrieveChapterByChapterId(chapterId: any, pirId: any) {
        const nodeRef = admin.database().ref(`pir/${pirId}/chapters/${chapterId}`);
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async deletePir(pirId: any) {
        const ref = await admin.database().ref('pir/');
        return await ref.child(pirId).remove();
    }

    async deleteChapter(pirId: any, chapterId: any) {
        const ref = await admin.database().ref(`pir/${pirId}/chapters/`);
        return await ref.child(chapterId).remove();
    }

    async leaveThePirFromTheGroup(pir: Pir) {
        const db = admin.database();
        //1- it removed the pir from groups-> works -> pirs
        const ref = db.ref(`groups/${pir.groupId}/works/pirs/`);
        await ref.child(pir.pirId).remove().then(() => {
            console.log('removed from the object in the database');
        })
            .catch((error) => {
                console.error('Error removing in the database:', error);
            });

        //2- it update pir in the node pirs
        const reff = db.ref(`pirs/${pir.pirId}/`);
        const updateData = {
            assigned: null,
            groupId: null
        };

        await reff.update(updateData)
            .then(() => {
                console.log('Features removed from the object in the database');
            })
            .catch((error) => {
                console.error('Error removing features from the object in the database:', error);
            });
    }
};