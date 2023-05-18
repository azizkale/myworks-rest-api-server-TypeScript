import { getDatabase, ref, set } from "firebase/database";
import * as admin from "firebase-admin";


export const deleteGroupFromUsers = async (groupId: any) => {

    const usersOfTheGroup = await admin.database().ref(`groups/${groupId}/users`)
    return usersOfTheGroup.once('value', async (snapshot) => {
        if (snapshot.exists()) {
            // access all users of the group
            const data = snapshot.val();
            //data =>  [{ email: 'azizkale@hotmail.com', role: 'mentor' },
            //          { email: 'aziz@hotmail.com', role: 'participant' }]

            //getting userId by email
            await data.map(async (data: any) => {
                const userId = await admin.auth().getUserByEmail(data.email).then((userRecord) => {
                    return userRecord.uid
                })

                //remove group of user from the node '`users/${userId}/groups/${groupId}`'
                const nodeRef = await admin.database().ref(`users/${userId}/groups/`)
                return await nodeRef.child(groupId).remove();

            })

        } else {
            return null
        }
    }, (error) => {
        return { error: error }
    });
}