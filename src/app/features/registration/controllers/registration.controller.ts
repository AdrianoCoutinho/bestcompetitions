import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { CreateRegistrationUsecase } from "../usecases/create-registration.usecase";
import { VerifyRegistrationUsecase } from "../usecases/verify-registration.usecase";

export class RegistrationController {
  public async create(req: Request, res: Response) {
    try {
      const { idCompetition } = req.params;

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

        const usecase = new CreateRegistrationUsecase();
        const result = await usecase.execute({
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

  public async verifyRegistration(req: Request, res: Response) {
    try {
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

        const usecase = new VerifyRegistrationUsecase();
        const result = await usecase.execute(idUser);
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
}
