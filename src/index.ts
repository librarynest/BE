import { Router } from "express";
import bookRouter from "./routes/book.route";
import authorRouter from "./routes/author.route";

const routes = Router();

routes.use("/books", bookRouter);
routes.use("/authors", authorRouter);

export default routes;
