import { Router } from "express";
import { makeSignupController } from "main/factories/signup";
import { adaptRoute } from "main/adapters/express-route-adapter";

export default (router: Router): void => {
  router.post("/signup", adaptRoute(makeSignupController()));
};
