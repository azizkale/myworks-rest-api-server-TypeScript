import * as admin from "firebase-admin";
import { getDatabase, ref, set } from "firebase/database";
import { User } from "./User";
import { Roles } from "./Roles";
import { addGroupToUser } from "../functions/addGroupToUser";
import { concatMap, from, map, toArray } from "rxjs";

const db = getDatabase();

export class Group {
    mentorId: any;
    users: [User]
    groupName: any;
    groupId: any;

    constructor(groupName: any, mentorId: any) {
        this.groupName = groupName,
            this.mentorId = mentorId
    }

    //for admin=====================
    //groups are created default with their mentors
    async createGroup(groupName: any, mentorId: any, groupId: any, mentorEmail: any) {
        //add group to 'groups' node in DB
        await set(ref(db, 'groups/' + groupId), {
            groupName: groupName,
            mentorId: mentorId,
            mentorEmail: mentorEmail,
            groupId: groupId,
            users: [{
                uid: mentorId,
                role: Roles[2]
            }]
        });
        //add the gtoup to the user (here the user ids mentor)
        addGroupToUser(mentorId, groupId, Roles[2])

    }

    async retrieveGroups() {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref('groups');
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async updateGroup(group: Group) {
        const db = admin.database();
        const ref = db.ref('groups/' + group.groupId);
        return ref.update(group)
            .then(() => {
                return { group }
            })
            .catch((error) => {
                console.error("Error updating data:", error);
                return { errror: error }
            });
    }

    async deleteGroup(groupId: any) {
        const ref = await admin.database().ref('groups/');
        return await ref.child(groupId).remove();
    }

    async retrieveAllGroupsOfTheUserByuserId(userId: any): Promise<any[]> {
        return new Promise<any[]>((resolve, reject) => {
            this.getUsersAllGroupsAndRoles(userId).then((info) => {
                const listGroups = info.val();

                from(listGroups).pipe(
                    concatMap((data: any) => this.retrieveSingleGroupByGroupId(data.groupId)),
                    map((group: Group | any) => ({
                        groupId: group.val().groupId,
                        groupName: group.val().groupName
                    })),
                    toArray()
                ).subscribe(
                    {
                        next: (groupData: any[]) => {
                            resolve(groupData); // Resolve the Promise with the groupData
                        }

                    }
                );
            }).catch((error) => {
                reject(error); // Reject the Promise if there is an error in getUsersAllGroupsAndRoles
            });
        });
    }

    async retrieveSingleGroupByGroupId(groupId: any) {
        // Get a reference to the desired node in the database
        const nodeRef = admin.database().ref('groups/' + groupId);
        // Read the data at the node once
        return nodeRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                // access the data from the snapshot if it exists
                const data = snapshot.val();
                return data

            } else {
                return null
            }
        }, (error) => {
            return { error: error }
        });
    }

    async getUsersAllGroupsAndRoles(userId: any) {
        // getting IDs and roles of all groups of the user
        const nodeRef = admin.database().ref(`users/${userId}/groups`);
        return nodeRef.once('value', async (snapshot) => {
        }, (error) => {
            return { error: error }
        });
    }
}