import { Router } from "express";

import conferenceRouter from "./conference";
import nounRouter from "./noun";

const apiRouter = Router();

apiRouter.use(conferenceRouter);
apiRouter.use(nounRouter);

export default Router().use("/api", apiRouter);
