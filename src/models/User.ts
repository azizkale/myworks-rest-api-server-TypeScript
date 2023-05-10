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
};