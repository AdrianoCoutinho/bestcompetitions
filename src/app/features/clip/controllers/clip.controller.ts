import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { CreateClipUsecase } from "../usecases/clip-cretate.usecase";

export class ClipController {
  public async create(req: Request, res: Response) {
    try {
      const { url, idUser, idCompetition } = req.body;

      const usecase = new CreateClipUsecase();
      const result = await usecase.execute({
        url,
        idUser,
        idCompetition,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
