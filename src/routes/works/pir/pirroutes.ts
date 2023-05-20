import express from 'express';
import pircontrollers from './pircontrollers'
import bodyParser from 'body-parser';
import tokenControl from '../../../functions/checkTokenExpiration';
import chechkRole from '../../../functions/role_check';

const router = express.Router();

router.use(bodyParser.json());
router.post('/pir/create', chechkRole, pircontrollers.createPir);
router.get('/pir/getpirs', tokenControl, pircontrollers.retrievePirs)
router.patch('/pir/updatepir', tokenControl, pircontrollers.updatePir)
router.delete('/pir/deletepir', tokenControl, pircontrollers.deletePir)

router.post('/pir/addchapter', tokenControl, pircontrollers.createChapter);
router.get('/pir/getchaptersbyeditorid', tokenControl, pircontrollers.retrieveChaptersByEditorId)
router.get('/pir/getallchapters', tokenControl, pircontrollers.retrieveAllChapters)
router.patch('/pir/updatechapter', tokenControl, pircontrollers.updateChapter)
router.delete('/pir/deletechapter', tokenControl, pircontrollers.deleteChapter)

router.post('/pir/createeditedwordpair', tokenControl, pircontrollers.createWordPair)
router.patch('/pir/updatewordpair', tokenControl, pircontrollers.updateWordPair)
router.get('/pir/getallwordpairsofsinglepir', tokenControl, pircontrollers.retrieveAllWordPairsOfSinglePir)
router.delete('/pir/deletewordpair', tokenControl, pircontrollers.deleteWordPair)

export default router;