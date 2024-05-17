import { Router } from "express";
import { checkLoginValidator } from "../../../shared/validators/check-login.validator";
import { RegistrationController } from "../controllers/registration.controller";

export const registrationRoutes = () => {
  const router = Router();

  router.post(
    "/:idCompetition",
    [checkLoginValidator],
    new RegistrationController().create
  );

  router.get(
    "/",
    [checkLoginValidator],
    new RegistrationController().verifyRegistration
  );

  return router;
};
