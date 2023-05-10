import express from 'express';
import bodyParser from 'body-parser';
import generalcontrollers from './groupcontrollers';
import tokenControl from '../../functions/checkTokenExpiration';

const router = express.Router();

router.use(bodyParser.json());
router.post('/group/creategroup', [tokenControl], generalcontrollers.createGroup);

export default router;