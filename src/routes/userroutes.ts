import express from "express";
import { UserController } from "../controllers/usercontrollers";
import { UserService } from "../services/userService";
import signin from "../middlewares/sigin";
import bodyParser from "body-parser";
import tokenControl from "../middlewares/checkTokenExpiration";
const router = express.Router();

router.use(bodyParser.json());

const userService = new UserService();
const userController = new UserController(userService);

router.post("/signin", signin.signin);
router.post("/users/createuser", userController.createUser);
router.get("/users/getUserById", userController.getUserById);
router.get("/users/retrieveallusers", userController.retrieveAllUsers);
router.get(
  "/users/retrieveeditorbyid",
  userController.retrieveEditorbyEditorId
);
router.get(
  "/users/retrieveuserbyemail",
  tokenControl,
  userController.retrieveUserByEmail
);
router.patch("/users/addroletouser", userController.addRoleToUser);
router.patch(
  "/users/addparticipant",
  tokenControl,
  userController.addPArticipantToGroup
);
router.get("/users/getuserroles", tokenControl, userController.getUserRoles);
router.get(
  "/users/retrieveallusersofthegroup",
  tokenControl,
  userController.retrieveAllUsersOfTheGroup
);
router.get(
  "/users/getuserrolesofthegroup",
  tokenControl,
  userController.retrieveSingleUserRolesOfTheGroup
);
export default router;
