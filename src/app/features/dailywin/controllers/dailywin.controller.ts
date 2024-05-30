import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { CreateDailyWinUsecase } from "../usecases/create-dailywin.usecase";
import { ListDailyWinUsecase } from "../usecases/list-dailywin.usecase";

export class DailyWinController {
  public async create(req: Request, res: Response) {
    try {
      const { idCompetition, date } = req.body;

      const authToken = req.headers["user"];

      if (!authToken) {
        return res.status(400).send({
          ok: false,
          message: "Token não informado",
        });
      }

      if (typeof req.headers["user"] === "string") {
        const usecase = new CreateDailyWinUsecase();
        const result = await usecase.execute(idCompetition, date);
        return res.status(result.code).send(result);
      }

      return res.status(500).send({
        ok: false,
        message: "erro, contate o administrador",
      });
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const usecase = new ListDailyWinUsecase();
      const result = await usecase.execute();

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
