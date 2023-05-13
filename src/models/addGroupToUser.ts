import { getDatabase, ref, set } from "firebase/database";


export const addGroupToUser = async (participantid: any, groupId: any, role: string) => {
    const db = getDatabase();
    await set(
        ref(db, 'users/' + participantid + '/participants/' + groupId), {
        groupId: groupId,
        role: role
    });
}