import { db_pir } from "./firebaseAdminInitialization";
import * as admin from "firebase-admin";

// Single database export
export const getDatabase = (): admin.database.Database => {
  return db_pir;
};
