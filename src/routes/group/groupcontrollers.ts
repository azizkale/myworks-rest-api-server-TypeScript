import * as admin from "firebase-admin";
import { Request, Response } from 'express';
import { Group } from "../../models/Group";
const { v1: uuidv1 } = require('uuid');

const instanceGroup = new Group(null, null)

const createGroup = async (req: Request, res: Response) => {
    const { groupName, mentorId } = req.body;
    const groupId = await uuidv1();
    const token = req.headers['authorization'].split(' ')[1];
    // await admin.auth().verifyIdToken(token).then(async (response) => {
    instanceGroup.createGroup(groupName, mentorId, groupId).then((result: any) => {
        res.status(200).send(result)
    }).catch((error) => {
        res.status(401).send(error)
    })
    // }).catch((err) => {
    //     return res.status(401).send(
    //         { error: err.message }
    //     );
    // })
}


export default { createGroup };