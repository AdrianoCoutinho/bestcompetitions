import { Router } from "express";
import { ClipController } from "../controllers/clip.controller";

export const clipRoutes = () => {
  const router = Router();

  router.post("/", new ClipController().create);

  router.get("/clipsId", new ClipController().getAllIds);

  return router;
};
