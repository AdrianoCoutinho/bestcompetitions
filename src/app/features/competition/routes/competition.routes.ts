import { Router } from "express";
import { checkAdminValidator } from "../../../shared/validators/check-admin-validator";
import { checkLoginValidator } from "../../../shared/validators/check-login.validator";
import { CompetitionController } from "../controllers/competition.controller";

export const competitionRoutes = () => {
  const router = Router();

  router.post("/", [checkLoginValidator], new CompetitionController().create);

  router.get("/", [checkLoginValidator], new CompetitionController().list);

  router.get(
    "/getemphasiscompetition",
    [checkLoginValidator],
    new CompetitionController().getEmphasisCompetition
  );

  router.get(
    "/:competitionId",
    [checkLoginValidator],
    new CompetitionController().getCompetition
  );

  router.post(
    "/setemphasiscompetition/:competitionId",
    [checkLoginValidator, checkAdminValidator],
    new CompetitionController().setEmphasisCompetition
  );

  return router;
};
