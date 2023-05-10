import express from 'express';
import bodyParser from 'body-parser';
import groupcontrollers from './groupcontrollers';
import tokenControl from '../../functions/checkTokenExpiration';

const router = express.Router();

router.use(bodyParser.json());
router.post('/group/creategroup', [tokenControl], groupcontrollers.createGroup);
router.get('/group/retrievegroups', [tokenControl], groupcontrollers.retrieveGroups)

export default router;