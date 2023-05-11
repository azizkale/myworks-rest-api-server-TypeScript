import * as admin from "firebase-admin";
import { getDatabase, ref, set } from "firebase/database";
import { User } from "./User";
import { Roles } from "./Roles";
const db = getDatabase();

export class Group {
    mentorId: any;
    participants: [User]
    groupName: any;
    groupId: any;

    constructor(groupName: any, mentorId: any) {
        this.groupName = groupName,
            this.mentorId = mentorId
    }

    //for admin=====================
    //groups are created default with their mentors
    async createGroup(groupName: any, mentorId: any, groupId: any, mentorEmail: any) {
        await set(ref(db, 'groups/' + groupId), {
            groupName: groupName,
            mentorId: mentorId,
            mentorEmail: mentorEmail,
            groupId: groupId,
            users: []
        });
        //to find that how mony group user has. as mentor or another roles
        await set(
            ref(db, 'users/' + mentorId + '/groups/' + groupId), {
            groupId: groupId,
            role: Roles[2]
        });


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

    async deleteGroup(groupId: any) {
        const ref = await admin.database().ref('groups/');
        return await ref.child(groupId).remove();
    }
}