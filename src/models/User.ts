import { getDatabase, ref, set } from "firebase/database";
import { Book } from "./Book";
import * as admin from "firebase-admin";
import { addGroupToUser } from "./addGroupToUser";

export class User {
    userName: string;
    email: string;
    password: string;
    role: number;
    books: [Book]

    constructor(username: string, email: string, password: string, role: number) {
        this.userName = username
        this.email = email
        this.password = password
        this.role = role
    }

    retrieveAllUsers = async () => {
        // let users: any[] = []
        // return await admin.auth().listUsers()
        //     .then(async (userRecords: any) => {
        //         userRecords.users.map((userInfo) => {
        //             let user = {
        //                 displayName: userInfo.displayName,
        //                 uid: userInfo.uid
        //             }
        //             users.push(user)
        //         })
        //     })
        //     .catch((error) => {
        //         console.log('Error fetching user data:', error);
        //     });
    }

    retrieveEditorByEditorId = async (editorId: any) => {
        return await admin.auth().getUser(editorId)
            .then(async (userRecords: any) => {
                return {
                    displayName: userRecords.displayName,
                    uid: userRecords.uid
                }
            })
    }

    addRoleToUser = async (userId: any, role: string) => {
        await admin.auth().getUser(userId).then(async (userRecord) => {
            if (userRecord.customClaims.roles.includes(role)) {
                console.log('this user is already a ' + role)
                return { response: 'this user is already a ' + role }
            }
            else {
                // adds role to users
                const uid = userRecord.uid;
                const arr = userRecord.customClaims.roles;
                await arr.push(role);
                await admin.auth().setCustomUserClaims(uid, { roles: arr })
                return { response: arr }
            }
        });
    }

    retrieveUserByEmail = async (email: any) => {
        try {
            const userRecord = admin.auth().getUserByEmail(email);
            return userRecord;
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                return {
                    error: 'User not found'
                };
            } else {
                return {
                    error: 'Error fetching user info'
                };
            }
        }

    }

    addParticipantToGroup = async (groupId: any, uid: any, role: string) => {
        const db = getDatabase();
        const newParticipant = {
            uid: uid,
            role: role
        }
        // retrieve group
        return admin.database().ref(`participants/${groupId}/users`)
            .once('value', async (snapshot) => {
                if (snapshot.exists()) {
                    //if there is an user-array already
                    const arrParticipants = await snapshot.val();

                    //controlling if the array has the users already
                    const elementIndex = arrParticipants.findIndex(element => JSON.stringify(element) === JSON.stringify(newParticipant));
                    if (elementIndex !== -1) {
                        return (`${newParticipant} exists in the array at index ${elementIndex}!`);
                    } else {
                        await arrParticipants.push(newParticipant)
                        //adding participant to group
                        await set(ref(db, 'participants/' + groupId + '/users'),
                            arrParticipants
                        );
                        //adding group to user
                        addGroupToUser(uid, groupId, role)

                        return await arrParticipants
                    }

                } else {
                    //if no user-array yet 
                    await set(ref(db, 'participants/' + groupId + '/users'),
                        [newParticipant]);
                    //adding group to user
                    addGroupToUser(uid, groupId, role)
                }
            }, (error) => {
                return { error: error }
            });

    }


}