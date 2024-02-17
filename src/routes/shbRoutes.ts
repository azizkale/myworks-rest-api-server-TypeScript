import express from "express";
import bodyParser from "body-parser";
import tokenControl from "../middlewares/checkTokenExpiration";
import { SahabeController } from "../controllers/shbControllers";
import { SahabeService } from "../services/sahabeService";

const router = express.Router();
const sahabeService = new SahabeService();
const sahabeController = new SahabeController(sahabeService);

router.use(bodyParser.json());
router.post("/shb/create", tokenControl, sahabeController.createShb);

export default router;
