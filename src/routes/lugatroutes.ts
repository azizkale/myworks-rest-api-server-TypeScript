import express from "express";
import bodyParser from "body-parser";
import { LugatController } from "../controllers/lugatcontrollers";

const router = express.Router();
const lugatController = new LugatController();
router.use(bodyParser.json());
router.get("/getmeaning", lugatController.getWordOfMeaning);

export default router;
