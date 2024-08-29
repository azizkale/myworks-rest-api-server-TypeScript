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
const firebaseConfig2 = {
  apiKey: process.env.p2_apiKey,
  authDomain: process.env.p2_authDomain,
  databaseURL: process.env.p2_databaseURL,
  projectId: process.env.p2_projectId,
  storageBucket: process.env.p2_storageBucket,
  messagingSenderId: process.env.p2_messagingSenderId,
  appId: process.env.p2_appId,
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const firebaseApp2 = !getApps().some((app) => app.name === "app2")
  ? initializeApp(firebaseConfig2, "app2")
  : getApp("app2");

export { firebaseApp, firebaseApp2 };
