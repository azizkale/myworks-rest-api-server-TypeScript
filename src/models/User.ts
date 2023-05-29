import { getDatabase, ref, set } from "firebase/database";
import { Book } from "./Book";
import * as admin from "firebase-admin";
import { addGroupToUser } from "../functions/addGroupToUser";
import { getRoles } from "../functions/role_getAll";
import { catchError, concatMap, from, map, of, tap, toArray } from "rxjs";

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

    retrieveEditorByEditorId = async (editorId: any) => {
        return await admin.auth().getUser(editorId)
            .then(async (userRecords: any) => {
                return {
                    displayName: userRecords.displayName,
                    uid: userRecords.uid
                }
            }).catch(error => {
                return { error: error.message }
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
        return admin.auth().getUserByEmail(email).then(userRecord => {
            return userRecord
        }).catch(error => {
            return { error: error.message }
        })
    }

    addParticipantToGroup = async (groupId: any, email: any, role: string) => {
        const db = getDatabase();
        const newParticipant = {
            role: role,
            email: email,
        }
        return new Promise<any[]>((resolve, reject) => {
            // retrieve group
            admin.database().ref(`groups/${groupId}/users/`)
                .once('value', async (snapshot) => {
                    if (snapshot.exists()) {
                        const participants = snapshot.val();
                        from(Object.values(participants)).pipe(
                            map(async (data: any) => {
                                //checks this email is a already member of this grup. if not, it adds the member
                                if (data.email !== email) {
                                    try {
                                        // if the user is not already a member, add them to the group
                                        const userRecords = await admin.auth().getUserByEmail(email);
                                        await set(ref(db, `groups/${groupId}/users/${userRecords.uid}`), {
                                            email: email,
                                            role: role
                                        });
                                        await addGroupToUser(userRecords.uid, groupId, role);
                                        return {
                                            response: {
                                                email: email,
                                                role: role
                                            } + ' added to the group'
                                        };
                                    } catch (error) {
                                        console.error('Error adding participant:', error);
                                        return { error: error };
                                    }
                                } else {
                                    return { response: 'this user is already member of this group' }
                                }
                            })
                        ).subscribe({
                            next: (result: any) => {
                                console.log(result)
                                return resolve(result)
                            }
                        })
                    }
                }).catch((error) => {
                    console.error('Error retrieving participants:', error);
                    return { error: error };
                });
        })

    }

    getUserRoles = async (uid: any) => {
        return getRoles(uid).then((roles) => {
            return roles
        }).catch((error) => {
            return { error: error.messages }
        })
    }

    async retrieveAllUsersOfTheGroup(groupId: any): Promise<any[]> {
        const nodeRef = admin.database().ref(`groups/${groupId}/users`);
        return new Promise<any[]>((resolve, reject) => {
            nodeRef.once('value', async (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    from(Object.values(data)).pipe(
                        concatMap((data: any) => this.retrieveUserByEmail(data.email).then((userRecord: any) => {
                            return { displayName: userRecord.displayName, uid: userRecord.uid }
                        })),
                        toArray()
                    ).subscribe({
                        next: (arrInfo: any[]) => {
                            return resolve(arrInfo);
                        }
                    }
                    );

                } else {
                    return null;
                }
            }, (error) => {
                return { error: error };
            });
        });
    }
}
