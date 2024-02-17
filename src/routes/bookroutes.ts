import express from "express";
import { BookController } from "../controllers/bookcontrollers";
import bodyParser from "body-parser";
import tokenControl from "../middlewares/checkTokenExpiration";

const router = express.Router();
const bookController = new BookController();

router.use(bodyParser.json());

router.post("/book/create", tokenControl, (req, res) => {
  bookController.createBook(req, res);
});

router.get("/book/retrieve", (req, res) => {
  bookController.retrieveAllBooks(req, res);
});

router.delete("/book/delete", tokenControl, (req, res) => {
  bookController.deleteBook(req, res);
});

router.patch("/book/update", tokenControl, (req, res) => {
  bookController.updateBook(req, res);
});

export default router;
