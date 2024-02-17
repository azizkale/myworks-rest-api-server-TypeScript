import * as admin from "firebase-admin";
const applicationDefault = require("../tools/applicationDefault.json");

admin.initializeApp({
  credential: admin.credential.cert(applicationDefault),
  databaseURL: "https://mywebsite-3f527-default-rtdb.firebaseio.com",
});

const firebaseAdminAppInitializer = admin.auth();
export default firebaseAdminAppInitializer;
