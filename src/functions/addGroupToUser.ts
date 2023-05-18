import { getDatabase, ref, set } from "firebase/database";
import * as admin from "firebase-admin";


export const addGroupToUser = async (userId: any, groupId: any, role: string) => {
    const db = getDatabase();
    const uObj = {
        groupId: groupId,
        role: role
    }
    console.log(userId)

    return admin.database().ref(`users/${userId}/groups/`)
        .once('value', async (snapshot) => {
            //if there is an user-array already
            if (snapshot.val()) {
                const arrGroups = await snapshot.val();
                console.log(arrGroups)
                // controlling if the array has the user already
                const isIncluded = arrGroups.some((obj) => {
                    obj.groupId === uObj.groupId && obj.role === uObj.role;
                });
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