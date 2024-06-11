import { Router } from "express";
import memberController from "../controller/member.controller";

const memberRouter = Router();
memberRouter.get("/", memberController.getAll);

export default memberRouter;
