import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { RequestError } from "../../../shared/errors/request.error";

export class GetAllViewsDailyValitador {
  public static async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { idCompetition, date } = req.body;

      if (!idCompetition) {
        return RequestError.fieldNotProvided(res, "id da competição");
      }

      if (!date) {
        return RequestError.fieldNotProvided(res, "data da competição");
      }

      next();
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
