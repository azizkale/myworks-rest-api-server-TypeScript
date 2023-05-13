import { getDatabase, ref, set } from "firebase/database";
import * as admin from "firebase-admin";


export const addGroupToUser = async (userId: any, groupId: any, role: string) => {
    const db = getDatabase();
    const uObj = {
        groupId: groupId,
        role: role
    }
    return admin.database().ref(`users/${userId}/groups/`)
        .once('value', async (snapshot) => {
            if (snapshot.val()) {
                //if there is an user-array already
                const arrGroups = await snapshot.val();

                // controlling if the array has the user already
                const isIncluded = arrGroups.some((obj) => {
                    obj.groupId === uObj.groupId && obj.role === uObj.role;
                });
                console.log(arrGroups)
                if (isIncluded) {
                    return (`${uObj} exists in the array at index`);
                } else {
                    await arrGroups.push(uObj)
                    //adding participant to group
                    await set(ref(db, `users/${userId}/groups/`),
                        arrGroups
                    );
                }
            }
            //if there is no user-array already
            else {
                await set(
                    ref(db, `users/${userId}/groups`), [uObj]);
            }

        }, (error) => {
            return { error: error }
        });
}