import { Request, Response } from "express";
import admin from "firebase-admin";
import { GroupService } from "../services/groupservice";

const { v1: uuidv1 } = require("uuid");

export class GroupController {
  private groupService: GroupService;

  constructor(groupService: GroupService) {
    this.groupService = groupService;
  }
  createGroup = async (req: Request, res: Response) => {
    const { groupName, mentorEmail } = req.body;
    //control wether user exists
    await admin
      .auth()
      .getUserByEmail(mentorEmail)
      .then(async (mentor) => {
        const groupId = await uuidv1();
        await this.groupService
          .createGroup(groupName, mentor.uid, groupId, mentorEmail)
          .then((result: any) => {
            res.status(200).send(result);
          })
          .catch((error) => {
            res.status(401).send(error);
          });
      })
      .catch((error) => {
        res.status(404).send(error.message);
      });
  };

  retrieveGroups = async (req: Request, res: Response) => {
    this.groupService
      .retrieveGroups()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(401).send(error);
      });
  };

  updateGroup = async (req: Request, res: Response) => {
    const group = req.body.group;
    this.groupService
      .updateGroup(group)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(401).send(error);
      });
  };

  deleteGroup = async (req: Request, res: Response) => {
    const groupId = req.body.groupId;
    this.groupService
      .deleteGroup(groupId)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  };

  retrieveAllGroupsNamesOfTheUserByuserId = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.query.userId;
    await this.groupService
      .retrieveAllGroupsOfTheUserByuserId(userId)
      .then((result: any) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  };

  retrieveSingleGroupOfUserByGroupId = async (req: Request, res: Response) => {
    const groupId = req.query.groupId;
    this.groupService
      .retrieveSingleGroupByGroupId(groupId)
      .then((result) => {
        res.status(200).send(result.val());
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  };

  retrieveAllParticipantsOfThegroupByGroupId = async (
    req: Request,
    res: Response
  ) => {
    const groupId = req.query.groupId;
    this.groupService
      .retrieveAllUsersOfTheGroup(groupId)
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((error) => {
        res.status(200).send({ error: error.message });
      });
  };

  retrieveAllGroupsOfTheMentor = async (req: Request, res: Response) => {
    const mentorId = req.query.mentorId;
    this.groupService
      .retrieveAllGroupsOfTheMentor(mentorId)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(200).send({ error: error.message });
      });
  };

  deleteParticipantFromGroup = async (req: Request, res: Response) => {
    const { groupId, email } = req.body;
    this.groupService
      .deleteParticipantFromGroup(groupId, email)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  };
}
// export default {
//   createGroup,
//   retrieveGroups,
//   updateGroup,
//   deleteGroup,
//   retrieveAllGroupsNamesOfTheUserByuserId,
//   retrieveSingleGroupOfUserByGroupId,
//   retrieveAllParticipantsOfThegroupByGroupId,
//   retrieveAllGroupsOfTheMentor,
//   deleteParticipantFromGroup,
// };
