import { Router } from "express";
import { checkLoginValidator } from "../../../shared/validators/check-login.validator";
import { RegistrationController } from "../controllers/registration.controller";

export const registrationRoutes = () => {
  const router = Router();

  router.post("/", [checkLoginValidator], new RegistrationController().create);

  return router;
};
