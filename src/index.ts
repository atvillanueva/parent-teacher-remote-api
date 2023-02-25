import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import env from "@/env";
import routes from "@/routes";
import errorHandler from "@/error-handler";

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`api-server listening at http://localhost:${env.PORT}`);
});
