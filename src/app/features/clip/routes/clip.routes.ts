import { Router } from "express";
import { checkLoginValidator } from "../../../shared/validators/check-login.validator";
import { ClipController } from "../controllers/clip.controller";
import { CreateClipValitador } from "../validators/create-clip.validator";

export const clipRoutes = () => {
  const router = Router();

  router.post(
    "/",
    [checkLoginValidator, CreateClipValitador.validate],
    new ClipController().create
  );

  router.get("/getAllViews", new ClipController().getAllIds);

  router.get("/getAllViewsZero", new ClipController().getAllIdsZero);

  return router;
};
