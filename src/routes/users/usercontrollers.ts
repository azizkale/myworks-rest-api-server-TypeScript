import * as admin from "firebase-admin";
import { Request, Response } from 'express';
import { User } from "../../models/User";

const instanceUser = new User(null, null, null, null)
const createUser = async (req: Request, res: Response) => {
    const { email, password } = await req.body;

    await admin.auth().getUserByEmail(email).then(async (userRecord) => {
        if (userRecord) {
            return await res.send({
                'status': 409,
                response: 'user already exists'
            });
        }
    }).catch(async (error) => {
        // if user does not exist than new user is created========
        await admin.auth().createUser({
            displayName: email.split('@')[0],
            password: password,
            email: email,
        })
            .then(async (userCredential) => {
                //adding role in firebase-auth within customclaims
                await admin.auth().setCustomUserClaims(userCredential.uid, { roles: new Array() });
                //getting idToken to send to the client-side===============
                admin.auth().createCustomToken(userCredential.uid)
                    .then(async (customToken) => {
                        return res.send({
                            "status": 200,
                            "message": "Success",
                            "token": customToken

                        });
                    })
                    .catch(async (error) => {
                        return await res.status(401).send({
                            "status": 404,
                            "message": error.message,
                        });
                    });
            });
    })
};

const getUserById = async (req: Request, res: Response) => {
    const userId: string | any = req.query.uid
    admin.auth().getUser(userId)
        .then((userRecord) => {
            return res.status(200).send(userRecord)
        }).catch(error => {
            return { error: error.message }
        })

}

const retrieveAllUsers = async (req: Request, res: Response) => {
    const token = req.headers['authorization'].split(' ')[1];

    await admin.auth().verifyIdToken(token).then(async (response) => {
        let users: any[] = []
        await admin.auth().listUsers()
            .then(async (userRecords: any) => {
                userRecords.users.map((userInfo) => {
                    let user = {
                        displayName: userInfo.displayName,
                        uid: userInfo.uid
                    }
                    users.push(user)
                })
                return await res.status(200).send(users)

            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });
    }).catch((err) => {
        return res.status(401).send(err.message);
    })

}

const retrieveEditorbyEditorId = async (req: Request, res: Response) => {
    const token = req.headers['authorization'].split(' ')[1];
    const editorid: any = req.query.editorid
    await admin.auth().verifyIdToken(token).then(async (response) => {
        instanceUser.retrieveEditorByEditorId(editorid).then((user) => {
            res.status(200).send(user)
        })

    }).catch((err) => {
        return res.status(401).send(err.message);
    })
}

const addRoleToUser = async (req: Request, res: Response) => {
    const uid: string | any = req.body.uid;
    const role = req.body.role;

    instanceUser.addRoleToUser(uid, role).then((result: any) => {
        res.status(200).send(result)
    }).catch((error: any) => {
        res.status(401).send(error)
    })

}

const retrieveUserByEmail = async (req: Request, res: Response) => {
    const email: any = req.query.email
    instanceUser.retrieveUserByEmail(email).then((result) => {
        res.status(200).send(result)
    }).catch((error) => {
        res.status(404).send({ error: error.message })
    })
}

const addPArticipantToGroup = async (req: Request, res: Response) => {
    const { groupId, email, role } = req.body
    await instanceUser.addParticipantToGroup(groupId, email, role).then((result) => {
        res.status(200).send(result)
    }).catch((error) => {
        res.status(404).send({ error: error.message })
    })
}

export default { createUser, getUserById, retrieveAllUsers, retrieveEditorbyEditorId, addRoleToUser, retrieveUserByEmail, addPArticipantToGroup };