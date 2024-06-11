import { Router } from "express";
import bookRouter from "./routes/book.route";
import authorRouter from "./routes/author.route";
import memberRouter from "./routes/member.route";
import staffRouter from "./routes/staff.route";

const routes = Router();

routes.use("/books", bookRouter);
routes.use("/authors", authorRouter);
routes.use("/member", memberRouter);
routes.use("/staff", staffRouter);

export default routes;
