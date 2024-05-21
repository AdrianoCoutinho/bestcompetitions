import { Router } from "express";
import { checkLoginValidator } from "../../../shared/validators/check-login.validator";
import { DailyWinController } from "../controllers/dailywin.controller";

export const dailywinRoutes = () => {
  const router = Router();

  router.post("/", [checkLoginValidator], new DailyWinController().create);

  return router;
};
