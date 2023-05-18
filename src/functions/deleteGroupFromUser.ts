import { getDatabase, ref, set } from "firebase/database";
import * as admin from "firebase-admin";


export const deleteGroupFromUsers = async (groupId: any) => {
    const db = getDatabase();

    const usersOfTheGroup = await admin.database().ref(`groups/${groupId}/users`)
    return usersOfTheGroup.once('value', async (snapshot) => {
        if (snapshot.exists()) {
            // access the users of the group
            const data = snapshot.val();
            //data =>  [{ email: 'azizkale@hotmail.com', role: 'mentor' },...]

            //getting userId by email
            await data.map(async (userinfo: any) => {
                const userId = await admin.auth().getUserByEmail(userinfo.email).then((userRecord) => {
                    return userRecord.uid
                })

                //get groups of the user by userId (as an array)
                const nodeRef = await admin.database().ref(`users/${userId}/groups`)
                await nodeRef.once('value', async (snapshot) => {
                    const groups = snapshot.val() || []
                    //remove selected group by groupId
                    await groups.filter((group: any) => group.groupId !== groupId);
                    return nodeRef.set(['azi kale'])

                })

            })


        } else {
            return null
        }
    }, (error) => {
        return { error: error }
    });
}