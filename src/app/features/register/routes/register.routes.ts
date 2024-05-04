import { Router } from "express";
import { RegisterValidator } from "../../validators/register.validator";
import { RegisterController } from "../controllers/register.controller";

export const registerRoutes = () => {
  const router = Router();

  router.post(
    "/",
    [RegisterValidator.validate],
    new RegisterController().create
  );

  //   router.get(
  //     "/",
  //     // [checkAdminValidator],
  //     new RegisterController().listall
  //   );

  return router;
};
