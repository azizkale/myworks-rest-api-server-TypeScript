import * as admin from "firebase-admin";
import { getDatabase, ref, set } from "firebase/database";
import { User } from "./User";
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

    async createGroup(groupName: any, mentorId: any, groupId: any, mentorEmail: any) {
        await set(ref(db, 'groups/' + groupId), {
            groupName: groupName,
            mentorId: mentorId,
            mentorEmail: mentorEmail,
            groupId: groupId,
            users: []
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
}