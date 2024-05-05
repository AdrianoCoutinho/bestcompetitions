import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { CreateRegistrationUsecase } from "../usecases/create-registration.usecase";

export class RegistrationController {
  public async create(req: Request, res: Response) {
    try {
      const { idUser, idCompetition } = req.body;

      const usecase = new CreateRegistrationUsecase();
      const result = await usecase.execute({
        idUser,
        idCompetition,
      });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
