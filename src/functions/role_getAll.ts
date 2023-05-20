import * as admin from "firebase-admin";

export const getRoles = async (uid) => {
    return await admin.auth().getUser(uid).then(async (userRecord) => {
        return userRecord.customClaims.roles;
    });
}