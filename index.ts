import express from "express";
import * as bodyParser from "body-parser";
import routes from "./src";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
