import { Router } from "express";
import staffController from "../controller/staff.controller";

const staffRouter = Router();
staffRouter.get("/", staffController.getAll);
staffRouter.post("/signin", staffController.staffLogin);
staffRouter.post("/signup", staffController.staffSignup);

export default staffRouter;
