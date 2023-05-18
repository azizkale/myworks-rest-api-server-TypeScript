import { getDatabase, ref, set } from "firebase/database";
import * as admin from "firebase-admin";


export const addGroupToUser = async (userId: any, groupId: any, role: string) => {
    const db = getDatabase();
    const uObj = {
        groupId: groupId,
        role: role
    }
    return await set(ref(db, `users/${userId}/groups/${groupId}`), uObj);

}