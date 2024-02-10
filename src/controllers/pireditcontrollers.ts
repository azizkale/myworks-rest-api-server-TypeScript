import { Request, Response } from "express";
import * as admin from "firebase-admin";
import { Pir } from "../models/Pir";
import { WordPair } from "../models/WordPair";
import { Chapter } from "../models/Chapter";
import { PirService } from "../services/pirService";
import { WordPairService } from "../services/wordPairService";

const { v1: uuidv1, v4: uuidv4 } = require("uuid");

export class PirEditController {
  private pirService: PirService;
  private wordPairService: WordPairService;

  constructor(pirService: PirService, wordPairService: WordPairService) {
    this.pirService = pirService;
    this.wordPairService = wordPairService;
  }

  createPir = async (req: Request, res: Response) => {
    let newPir: Pir = req.body.pir;

    if (newPir.pirId === null) {
      newPir.pirId = await uuidv1();
    }

    await this.pirService
      .createPir(newPir)
      .then(() => {
        res.status(200).send(newPir);
      })
      .catch((err) => {
        return res.status(409).send({ error: err.message });
      });
  };

  assingPirToGroup = async (req: Request, res: Response) => {
    const { pirinfo, groupId } = req.body;
    this.pirService
      .assignPirToGroup(pirinfo, groupId)
      .then((pir) => {
        res.status(200).send({ response: pir + " added" });
      })
      .catch((error) => {
        res.status(401).send({ error: error.message });
      });
  };

  // const retrievePirs = async (req: Request, res: Response) => {
  //     const pirEditorId = req.query.pirEditorId;
  //     this.pirService.retrievePirsByPirEditorId(pirEditorId).then((pirs) => {
  //         return res.status(200).send(pirs)
  //     })
  // }

  createChapter = async (req: Request, res: Response) => {
    const chapter: Chapter = req.body.chapter;
    chapter.chapterId = uuidv1();
    this.pirService
      .addChapterToPir(chapter)
      .then(() => {
        res.status(200).send(chapter);
      })
      .catch((err) => {
        return res.status(409).send({ error: err.message });
      });
  };

  retrieveChaptersByEditorId = async (req: Request, res: Response) => {
    try {
      const editorId: any = req.query.editorId;
      const pirId: any = req.query.pirId;

      const pirs = await this.pirService.retrievePirs();

      const selectedPir: Pir | undefined = Object.values<Pir>(pirs.val()).find(
        (pir: Pir) => pir.pirId === pirId
      );

      if (!selectedPir) {
        return res.status(404).send({ error: "Selected pir not found" });
      }

      const chapters = Object.values<Chapter>(selectedPir.chapters).filter(
        (chapter: Chapter) => chapter.editorId === editorId
      );

      return res.status(200).send(chapters);
    } catch (error: any) {
      return res.status(401).send({ error: error.message });
    }
  };

  retrieveAllChapters = async (req: Request, res: Response) => {
    try {
      const pirId: any = req.query.pirId;

      const pirs = await this.pirService.retrievePirs();
      const selectedPir: Pir | undefined = Object.values<Pir>(pirs.val()).find(
        (pir: Pir) => pir.pirId === pirId
      );

      if (!selectedPir) {
        return res.status(404).send({ error: "Selected pir not found" });
      }

      const chapters = selectedPir.chapters;
      return res.status(200).send(chapters);
    } catch (error: any) {
      return res.status(401).send({ error: error.message });
    }
  };

  updateChapter = async (req: Request, res: Response) => {
    const chapter: Chapter = req.body.chapter;
    this.pirService.updateChapter(chapter).then((updatedChapter) => {
      return res.status(200).send(updatedChapter);
    });
  };

  updatePir = async (req: Request, res: Response) => {
    const pir: Pir = req.body.pir;
    this.pirService.updatePir(pir).then((updatedPir) => {
      return res.status(200).send(updatedPir);
    });
  };

  createWordPair = async (req: Request, res: Response) => {
    const wordpair: WordPair = req.body.wordpair;
    await this.wordPairService.createWordPair(wordpair);
    return res.status(200).send(wordpair);
  };

  updateWordPair = async (req: Request, res: Response) => {
    try {
      const wordPair: WordPair = req.body.wordPair;
      const token = req.headers?.["authorization"]?.split(" ")[1]; // Check if headers is defined

      if (!token) {
        return res
          .status(401)
          .send({ error: "Authorization token not provided" });
      }

      const response = await admin.auth().verifyIdToken(token);

      const updatedWordPair = await this.wordPairService.updateWordPair(
        wordPair
      );

      return res.status(200).send(updatedWordPair);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: "Internal server error" });
    }
  };

  deletePir = async (req: Request, res: Response) => {
    const pirId = req.body.pirId;
    // this.pirService.deletePir(pirId).then(() => {
    //     return res.status(200).send(
    //         { info: 'the book at' + pirId + 'id! deleted' }
    //     );
    // })
  };

  retrieveAllWordPairsOfSinglePir = async (req: Request, res: Response) => {
    const pirId = req.query.pirId;
    this.wordPairService
      .retrieveAllWordPairsOfSinglePir(pirId)
      .then((data: any) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        return res.status(401).send({ error: error.message });
      });
  };

  deleteChapter = async (req: Request, res: Response) => {
    const pirId = req.body.pirId;
    const chapterId = req.body.chapterId;
    this.pirService.deleteChapter(pirId, chapterId).then(() => {
      return res
        .status(200)
        .send({ info: "the chapter at" + pirId + "id! deleted" });
    });
  };

  deleteWordPair = async (req: Request, res: Response) => {
    const wordPair = req.body.wordPair;
    this.wordPairService.deleteWordPair(wordPair).then((ress) => {
      return res.status(200).send({ info: wordPair.word + " deleted" });
    });
  };

  retrievePirList = async (req: Request, res: Response) => {
    this.pirService
      .retrievePirList()
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((error) => {
        res.status(200).send({ error: error.message });
      });
  };

  retrievePirByPirId = async (req: Request, res: Response) => {
    const pirId = req.query.pirId;
    this.pirService
      .retrievePirByPirid(pirId)
      .then((pir: any) => {
        res.status(200).send(pir);
      })
      .catch((error) => {
        res.status(200).send({ error: error.message });
      });
  };

  leaveThePirFromTheGroup = async (req: Request, res: Response) => {
    const pir = req.body.pir;
    this.pirService
      .leaveThePirFromTheGroup(pir)
      .then((ress: any) => {
        res.status(200).send(ress);
      })
      .catch((error) => {
        res.status(200).send({ error: error.message });
      });
  };
}

// export default {
//   createPir,
//   createChapter,
//   retrieveChaptersByEditorId,
//   updateChapter,
//   updatePir,
//   createWordPair,
//   updateWordPair,
//   deletePir,
//   retrieveAllWordPairsOfSinglePir,
//   deleteChapter,
//   deleteWordPair,
//   retrieveAllChapters,
//   retrievePirList,
//   assingPirToGroup,
//   retrievePirByPirId,
//   leaveThePirFromTheGroup,
// };
