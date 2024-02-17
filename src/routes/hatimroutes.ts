import express from "express";
import { HatimController } from "../controllers/hatimcontrollers";
import { HatimService } from "../services/hatimService";
import bodyParser from "body-parser";
import tokenControl from "../middlewares/checkTokenExpiration";
import chechkRole from "../middlewares/role_check";

const router = express.Router();
const hatimService = new HatimService();
const hatimController = new HatimController(hatimService);

router.use(bodyParser.json());
router.post("/hatim/create", chechkRole, hatimController.createHatim);
router.get("/hatim/retrieve", tokenControl, hatimController.retrieveHatim);
router.get(
  "/hatim/retrievesinglecuz",
  tokenControl,
  hatimController.getSingleCuz
);
router.delete("/hatim/delete", tokenControl, hatimController.deleteHatim);
router.patch("/hatim/update", tokenControl, hatimController.updateHatim);
router.get("/hatim/getReaderName", tokenControl, hatimController.getReaderName);
router.get(
  "/hatim/getAnotherReadersName",
  tokenControl,
  hatimController.getNameOfAnotherUsers
);

export default router;
