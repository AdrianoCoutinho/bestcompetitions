import { Router } from "express";
import { checkLoginValidator } from "../../../shared/validators/check-login.validator";
import { UserController } from "../controller/user.controller";

export const userRoutes = () => {
  const router = Router();

  router.get("/", [checkLoginValidator], new UserController().get);

  return router;
};
