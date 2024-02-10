import express from "express";
import bodyParser from "body-parser";
import { GeneralController } from "../controllers/generalcontrollers";

const router = express.Router();
const generalController = new GeneralController();

router.use(bodyParser.json());

router.get("/general/tokenexpiringcontrol", (req, res) => {
  generalController.controlTokenExpired(req, res);
});

export default router;
