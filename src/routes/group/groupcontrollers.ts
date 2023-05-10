import { Request, Response } from 'express';
import { Group } from "../../models/Group";
const { v1: uuidv1 } = require('uuid');

const instanceGroup = new Group(null, null)

const createGroup = async (req: Request, res: Response) => {
    const { groupName, mentorId } = req.body;
    const groupId = await uuidv1();
    await instanceGroup.createGroup(groupName, mentorId, groupId).then((result: any) => {
        res.status(200).send(result)
    }).catch((error) => {
        res.status(401).send(error)
    })
}

const retrieveGroups = async (req: Request, res: Response) => {
    instanceGroup.retrieveGroups().then((result) => {
        res.status(200).send((result));
    }).catch((error) => {
        res.status(401).send(error)
    })

}


export default { createGroup, retrieveGroups };