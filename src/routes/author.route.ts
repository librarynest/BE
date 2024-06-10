import { Router } from "express";
import authorController from "../controller/author.controller";

const authorRouter = Router();
authorRouter.get("/", authorController.getAllAuthor);
authorRouter.post("/", authorController.insertAuthor);

export default authorRouter;
