import { db_de, db_pir } from "./firebaseAdminInitialization";
import * as admin from "firebase-admin";

export enum Databases {
  DB_pir = "DB_pir",
  DB_de = "DB_de",
}

const databases: { [key in Databases]: admin.database.Database } = {
  [Databases.DB_pir]: db_pir,
  [Databases.DB_de]: db_de,
};

export const getDatabase = (db: Databases): admin.database.Database => {
  return databases[db];
};
