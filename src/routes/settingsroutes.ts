import express from "express";
import { SettingsController } from "../controllers/settingscontrollers";
import bodyParser from "body-parser";
import tokenControl from "../middlewares/checkTokenExpiration";

const router = express.Router();
router.use(bodyParser.json());
const settingsController = new SettingsController();

router.get(
  "/settings/getuserinfo",
  tokenControl,
  settingsController.getUserInfo
);
router.patch(
  "/settings/updateuser",
  tokenControl,
  settingsController.updateUser
);
router.patch(
  "/settings/updateuserpassword",
  tokenControl,
  settingsController.updateUserPassword
);

export default router;
