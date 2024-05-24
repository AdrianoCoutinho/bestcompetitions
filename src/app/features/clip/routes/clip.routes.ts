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

  router.get(
    "/getAllViews",
    [checkLoginValidator],
    new ClipController().getAllIds
  );

  router.get(
    "/getAllViewsDaily",
    [checkLoginValidator, GetAllViewsDailyValitador.validate],
    new ClipController().getAllIdsDaily
  );

  return router;
};
