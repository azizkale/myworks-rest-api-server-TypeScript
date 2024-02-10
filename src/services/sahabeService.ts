import { SHB } from "../models/shb";
import { getDatabase, ref, set } from "firebase/database";

export class SahabeService {
  createShb = (shb: SHB) => {
    const db = getDatabase();
    set(ref(db, "users/" + shb.editorId + "/works/shb/" + shb.shbId), shb);
  };
}
