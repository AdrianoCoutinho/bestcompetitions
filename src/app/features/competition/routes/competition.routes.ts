import { Router } from "express";
import { CompetitionController } from "../controllers/competition.controller";

export const competitionRoutes = () => {
  const router = Router();

  router.post("/", new CompetitionController().create);

  return router;
};
