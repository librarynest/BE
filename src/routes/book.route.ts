import { Router } from "express";
import bookController from "../controller/book.controller";

const bookRouter = Router();
bookRouter.get("/", bookController.getAll);
bookRouter.post("/", bookController.insertBook);

export default bookRouter;
