import { Router } from "express";
import { RegistrationController } from "../controllers/registration.controller";

export const registrationRoutes = () => {
  const router = Router();

  router.post("/", new RegistrationController().create);

  return router;
};
