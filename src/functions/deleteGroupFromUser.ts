import { getDatabase, ref, set } from "firebase/database";
import * as admin from "firebase-admin";


export const deleteGroupFromUsers = async (groupId: any) => {

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
                    const newGroupsArray = groups.filter((info: any) => info.groupId !== groupId)

                    console.log(newGroupsArray)
                    const ref = admin.database().ref(`users/${userId}/groups`)
                    return ref.update(newGroupsArray)
                        .then(() => {
                            return { newGroupsArray }
                        })
                        .catch((error) => {
                            console.error("Error updating data:", error);
                            return { errror: error }
                        });

                })

            })


        } else {
            return null
        }
    }, (error) => {
        return { error: error }
    });
}