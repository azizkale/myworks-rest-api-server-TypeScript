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

    async createGroup(groupName: any, mentorId: any, groupId: any) {
        await set(ref(db, 'groups/' + groupId), {
            groupName: groupName,
            mentorId: mentorId,
            users: []
        });
    }
}