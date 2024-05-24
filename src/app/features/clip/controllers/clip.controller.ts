import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { CreateClipUsecase } from "../usecases/clip-cretate.usecase";
import { GetAllViewsDailyUsecase } from "../usecases/get-all-views-daily.usecase";
import { GetAllViewsUsecase } from "../usecases/get-all-views.usecase";

export class ClipController {
  public async create(req: Request, res: Response) {
    try {
      const { url, idCompetition } = req.body;

      const authToken = req.headers["user"];

      if (!authToken) {
        return res.status(400).send({
          ok: false,
          message: "Token não informado",
        });
      }

      if (typeof req.headers["user"] === "string") {
        const authToken = req.headers["user"] as string;
        const userObject = JSON.parse(authToken);
        const idUser = userObject._id;

        const usecase = new CreateClipUsecase();
        const result = await usecase.execute({
          url,
          idCompetition,
          idUser,
        });
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

  public async getAllIds(req: Request, res: Response) {
    try {
      const { idCompetition } = req.body;

      const usecase = new GetAllViewsUsecase();
      const result = await usecase.execute({ idCompetition });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

  public async getAllIdsDaily(req: Request, res: Response) {
    try {
      const { idCompetition, date } = req.body;

      const usecase = new GetAllViewsDailyUsecase();
      const result = await usecase.execute({ idCompetition, date });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
