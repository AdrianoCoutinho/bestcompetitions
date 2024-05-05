import { Router } from "express";
import { checkLoginValidator } from "../../../shared/validators/check-login.validator";
import { ApifyController } from "../controllers/apify.controller";

export const apifyRoutes = () => {
  const router = Router();

  router.post(
    "/validateTiktok",
    [checkLoginValidator],
    new ApifyController().TiktokUser
  );

  router.post(
    "/confirmvalidateTiktok",
    [checkLoginValidator],
    new ApifyController().validateTiktokUser
  );

  return router;
};
