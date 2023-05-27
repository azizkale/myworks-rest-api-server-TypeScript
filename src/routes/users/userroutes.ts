import express from 'express';
import usercontroller from './usercontrollers';
import signin from '../../functions/sigin';
import bodyParser from 'body-parser';
import tokenControl from '../../functions/checkTokenExpiration';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
const router = express.Router();

router.use(bodyParser.json());


/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign In
 *     description: Authenticate user and generate an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               password:
 *                 type: string
 *                 description: User's password.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successful sign-in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token for the authenticated user.
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating authentication failure.
 */
router.post('/signin', signin.signin);
router.post('/users/createuser', usercontroller.createUser);
router.get('/users/getUserById', usercontroller.getUserById);
router.get('/users/retrieveallusers', usercontroller.retrieveAllUsers)
router.get('/users/retrieveeditorbyid', usercontroller.retrieveEditorbyEditorId)
router.get('/users/retrieveuserbyemail', usercontroller.retrieveUserByEmail)
router.patch('/users/addroletouser', usercontroller.addRoleToUser)
router.patch('/users/addparticipant', tokenControl, usercontroller.addPArticipantToGroup)
router.get('/users/getuserroles', tokenControl, usercontroller.getUserRoles)
export default router
