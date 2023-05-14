import express from 'express';
import bodyParser from 'body-parser';
import groupcontrollers from './groupcontrollers';
import tokenControl from '../../functions/checkTokenExpiration';

const router = express.Router();

router.use(bodyParser.json());
router.post('/group/creategroup', [tokenControl], groupcontrollers.createGroup);
router.get('/group/retrievegroups', [tokenControl], groupcontrollers.retrieveGroups)
router.patch('/group/updategroup', [tokenControl], groupcontrollers.updateGroup)
router.delete('/group/deletegroup', [tokenControl], groupcontrollers.deleteGroup)
router.get('/group/retrieveallgroupsnamesoftheuserbyuserid', [tokenControl], groupcontrollers.retrieveAllGroupsNamesOfTheUserByuserId)

export default router;