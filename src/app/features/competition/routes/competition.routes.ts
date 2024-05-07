import { Router } from "express";
import { checkLoginValidator } from "../../../shared/validators/check-login.validator";
import { CompetitionController } from "../controllers/competition.controller";

export const competitionRoutes = () => {
  const router = Router();

  router.post("/", [checkLoginValidator], new CompetitionController().create);

  router.get(
    "/:competitionId",
    [checkLoginValidator],
    new CompetitionController().getCompetition
  );

  return router;
};
