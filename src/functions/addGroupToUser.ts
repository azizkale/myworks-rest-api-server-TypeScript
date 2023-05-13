import { getDatabase, ref, set } from "firebase/database";
import * as admin from "firebase-admin";


export const addGroupToUser = async (participantid: any, groupId: any, role: string) => {
    const db = getDatabase();
    const obj = {
        groupId: groupId,
        role: role
    }
    return admin.database().ref(`users/${participantid}/groups/`)
        .once('value', async (snapshot) => {
            if (snapshot.val()) {
                //if there is an user-array already
                const arrGroups = await snapshot.val();

                // controlling if the array has the user already
                const elementIndex = arrGroups.findIndex(element => JSON.stringify(element) === JSON.stringify(obj));
                if (elementIndex !== -1) {
                    return (`${obj} exists in the array at index ${elementIndex}!`);
                } else {
                    await arrGroups.push(obj)
                    //adding participant to group
                    await set(ref(db, `groups/${groupId}/users`),
                        arrGroups
                    );
                }
            }
            else {
                await set(
                    ref(db, `users/${participantid}/groups`), [obj]);
            }

        }, (error) => {
            return { error: error }
        });
}