import { Request, Response } from 'express';
import { Group } from "../../models/Group";
import admin from 'firebase-admin'

const { v1: uuidv1 } = require('uuid');

const instanceGroup = new Group(null, null)

const createGroup = async (req: Request, res: Response) => {
    const { groupName, mentorEmail } = req.body;
    //control wether user exists
    await admin.auth().getUserByEmail(mentorEmail)
        .then(async (mentor) => {
            const groupId = await uuidv1();
            await instanceGroup.createGroup(groupName, mentor.uid, groupId, mentorEmail).then((result: any) => {
                res.status(200).send(result)
            }).catch((error) => {
                res.status(401).send(error)
            })
        }).catch((error) => {
            res.status(404).send(error.message)
        })

}

const retrieveGroups = async (req: Request, res: Response) => {
    instanceGroup.retrieveGroups().then((result) => {
        res.status(200).send((result));
    }).catch((error) => {
        res.status(401).send(error)
    })

}

const updateGroup = async (req: Request, res: Response) => {
    const group = req.body.group;
    instanceGroup.updateGroup(group).then((result) => {
        res.status(200).send(result);
    }).catch((error) => {
        res.status(401).send(error)
    })
}

const deleteGroup = async (req: Request, res: Response) => {
    const groupId = req.body.groupId;
    instanceGroup.deleteGroup(groupId).then((result) => {
        res.status(200).send(result)
    })
}


export default { createGroup, retrieveGroups, updateGroup, deleteGroup };