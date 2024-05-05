import { Router } from "express";
import { ClipController } from "../controllers/clip.controller";

export const clipRoutes = () => {
  const router = Router();

  router.post("/", new ClipController().create);

  return router;
};
