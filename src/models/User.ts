import { getDatabase, ref, set } from "firebase/database";
import { Book } from "./Book";
import * as admin from "firebase-admin";

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

    addParticipantToGroup = async (groupId: any, email: any, role: string) => {
        const db = getDatabase();

        admin.auth().getUserByEmail(email).then((user) => {
            set(ref(db, 'groups/' + groupId + '/users'),
                [{
                    userId: user.uid,
                    role: role
                }]
            );
        })
        // retrieve groups
        const nodeRef = admin.database().ref(`groups/${groupId}/users`);
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                if (data)
                    return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });

    }
};