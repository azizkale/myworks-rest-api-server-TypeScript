import * as admin from "firebase-admin";
import { NextFunction, Request, Response } from 'express';

const chechkRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idToken = await req.body.token || req.headers['authorization'].split(' ')[1];
        // admin.auth()
        //     .verifyIdToken(idToken)
        //     .then((payload) => {
        //         // Token is valid.               
        //         console.log(payload)
        //         next()
        //     })
        //     .catch((err) => {
        //         return res.status(401).send(err.message);
        //     });
    } catch (error) {
        return res.status(401).send(error.message);
    }
    return true
}

export default chechkRole;