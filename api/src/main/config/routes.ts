import { Express, Router } from "express";

import { signUpRoutes } from "../routes";

export default (app: Express): void => {
  const router = Router();
  app.use("/api/v1", router);
  signUpRoutes(router);
};
