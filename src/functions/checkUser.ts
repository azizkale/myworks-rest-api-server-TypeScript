import * as admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
const applicationDefault = require("../tools/applicationDefault.json");

initializeApp({
  credential: admin.credential.cert(applicationDefault),
  databaseURL: "https://mywebsite-3f527-default-rtdb.firebaseio.com",
});

export const checkUser = async (email: any) => {
  const user = await admin.auth().getUserByEmail(email).then((userRecord) => {
    console.log(userRecord)
  }).catch((error) => {
    console.log(error.message)
  })
};
