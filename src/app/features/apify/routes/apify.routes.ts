import { Router } from "express";
import { checkLoginValidator } from "../../../shared/validators/check-login.validator";
import { ApifyController } from "../controllers/apify.controller";

export const apifyRoutes = () => {
  const router = Router();

  router.get(
    "/getcodetiktok",
    [checkLoginValidator],
    new ApifyController().GetCodeTiktok
  );

  router.post(
    "/confirmvalidateTiktok",
    [checkLoginValidator],
    new ApifyController().validateTiktokUser
  );

  return router;
};
