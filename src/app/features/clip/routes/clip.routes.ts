import { Router } from "express";
import { checkLoginValidator } from "../../../shared/validators/check-login.validator";
import { ClipController } from "../controllers/clip.controller";
import { CreateClipValitador } from "../validators/create-clip.validator";
import { GetAllViewsDailyValitador } from "../validators/get-all-views-daily.validator";

export const clipRoutes = () => {
  const router = Router();

  router.post(
    "/",
    [checkLoginValidator, CreateClipValitador.validate],
    new ClipController().create
  );

  router.get("/user", [checkLoginValidator], new ClipController().listPerUser);

  router.get(
    "/competition",
    [checkLoginValidator],
    new ClipController().listPerCompetition
  );

  router.post(
    "/getAllViews",
    [checkLoginValidator],
    new ClipController().getAllIds
  );

  router.post(
    "/getAllViewsDaily",
    [checkLoginValidator, GetAllViewsDailyValitador.validate],
    new ClipController().getAllIdsDaily
  );

  return router;
};
