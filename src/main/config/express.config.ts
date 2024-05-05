import cors from "cors";
import express from "express";
import { loginRoutes } from "../../app/features/login/routes/login.routes";
import { registerRoutes } from "../../app/features/register/routes/register.routes";

export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use("/auth", loginRoutes());

  app.use("/register", registerRoutes());

  return app;
};
