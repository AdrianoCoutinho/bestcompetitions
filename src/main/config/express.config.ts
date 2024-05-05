import cors from "cors";
import express from "express";
import { apifyRoutes } from "../../app/features/apify/routes/apify.routes";
import { clipRoutes } from "../../app/features/clip/routes/clip.routes";
import { competitionRoutes } from "../../app/features/competition/routes/competition.routes";
import { loginRoutes } from "../../app/features/login/routes/login.routes";
import { registerRoutes } from "../../app/features/register/routes/register.routes";
import { registrationRoutes } from "../../app/features/registration/routes/registration.routes";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/auth", loginRoutes());

  app.use("/register", registerRoutes());

  app.use("/competition", competitionRoutes());

  app.use("/clip", clipRoutes());

  app.use("/registration", registrationRoutes());
  apifyRoutes;

  app.use("/validations", apifyRoutes());

  return app;
};
