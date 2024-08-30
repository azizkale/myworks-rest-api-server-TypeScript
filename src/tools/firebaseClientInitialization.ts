import { getApp, getApps, initializeApp } from "firebase/app";

require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.p1_apiKey,
  authDomain: process.env.p1_authDomain,
  databaseURL: process.env.p1_databaseURL,
  projectId: process.env.p1_projectId,
  storageBucket: process.env.p1_storageBucket,
  messagingSenderId: process.env.p1_messagingSenderId,
  appId: process.env.p1_appId,
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export { firebaseApp };
