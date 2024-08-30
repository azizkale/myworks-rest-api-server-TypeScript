import { Databases, getDatabase } from "./DB";

export class CRUD {
  public static create = async (db: Databases, path: string, data: any) => {
    const database = getDatabase(db);
    try {
      await database.ref(path).set(data);
      console.log("Data created successfully at", path);
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  public static read = async (db: Databases, path: string) => {
    const database = getDatabase(db);
    try {
      const snapshot = await database.ref(path).once("value");
      const data = snapshot.val();
      console.log("Data read successfully from", path, ":", data);
      return data;
    } catch (error) {
      console.error("Error reading data:", error);
    }
  };

  public static update = async (db: Databases, path: string, data: any) => {
    const database = getDatabase(db);
    try {
      await database.ref(path).update(data);
      console.log("Data updated successfully at", path);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  public static delete = async (db: Databases, path: string) => {
    const database = getDatabase(db);
    try {
      await database.ref(path).remove();
      console.log("Data deleted successfully from", path);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
}
