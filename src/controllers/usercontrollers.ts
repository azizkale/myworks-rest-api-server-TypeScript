import * as admin from "firebase-admin";
import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  createUser = async (req: Request, res: Response) => {
    const { email, password } = await req.body;

    await admin
      .auth()
      .getUserByEmail(email)
      .then(async (userRecord) => {
        if (userRecord) {
          return await res.send({
            status: 409,
            response: "user already exists",
          });
        }
      })
      .catch(async (error) => {
        // if user does not exist than new user is created========
        await admin
          .auth()
          .createUser({
            displayName: email.split("@")[0],
            password: password,
            email: email,
          })
          .then(async (userCredential) => {
            //adding role in firebase-auth within customclaims
            await admin
              .auth()
              .setCustomUserClaims(userCredential.uid, { roles: new Array() });
            //getting idToken to send to the client-side===============
            admin
              .auth()
              .createCustomToken(userCredential.uid)
              .then(async (customToken) => {
                return res.send({
                  status: 200,
                  message: "Success",
                  token: customToken,
                });
              })
              .catch(async (error) => {
                return await res.status(401).send({
                  status: 404,
                  message: error.message,
                });
              });
          });
      });
  };

  getUserById = async (req: Request, res: Response) => {
    const userId: string | any = req.query.uid;
    admin
      .auth()
      .getUser(userId)
      .then((userRecord) => {
        console.log(userRecord);
        return res.status(200).send(userRecord);
      })
      .catch((error) => {
        return { error: error.message };
      });
  };

  retrieveAllUsers = async (req: Request, res: Response) => {
    let users: any[] = [];
    await admin
      .auth()
      .listUsers()
      .then(async (userRecords: any) => {
        userRecords.users.map((userInfo: any) => {
          let user = {
            displayName: userInfo.displayName,
            uid: userInfo.uid,
          };
          users.push(user);
        });
        return await res.status(200).send(users);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  };

  retrieveEditorbyEditorId = async (req: Request, res: Response) => {
    const editorid: any = req.query.editorid;
    this.userService.retrieveEditorByEditorId(editorid).then((user) => {
      res.status(200).send(user);
    });
  };

  addRoleToUser = async (req: Request, res: Response) => {
    const { uid, role, groupId } = req.body;
    this.userService
      .addRoleToUser(uid, role, groupId)
      .then((result: any) => {
        res.status(200).send(result);
      })
      .catch((error: any) => {
        res.status(401).send(error);
      });
  };

  retrieveUserByEmail = async (req: Request, res: Response) => {
    const email: any = req.query.email;
    this.userService
      .retrieveUserByEmail(email)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  };

  addPArticipantToGroup = async (req: Request, res: Response) => {
    const { groupId, email, role } = req.body;
    await this.userService
      .addParticipantToGroup(groupId, email, role)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  };

  getUserRoles = async (req: Request, res: Response) => {
    const uid: any = req.query.uid;
    this.userService
      .getUserRoles(uid)
      .then((roles) => {
        res.status(200).send(roles);
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  };
  retrieveAllUsersOfTheGroup = async (req: Request, res: Response) => {
    const groupId: any = req.query.groupId;
    this.userService
      .retrieveAllUsersOfTheGroup(groupId)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  };

  retrieveSingleUserRolesOfTheGroup = async (req: Request, res: Response) => {
    const { groupId, userId } = req.query;

    this.userService
      .retrieveSingleUserRolesOfTheGroup(groupId, userId)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  };
}
