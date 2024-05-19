import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { CreateValidationUserTiktokUsecase } from "../usecases/create-validation-user-tiktok.usecase";
import { GetValidationUserTiktokUsecase } from "../usecases/get-validation-user-tiktok.usecase";

export class ApifyController {
  public async GetCodeTiktok(req: Request, res: Response) {
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
        const userId = userObject._id;
        const usecase = new CreateValidationUserTiktokUsecase();
        const result = await usecase.execute({
          userId,
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

  public async validateTiktokUser(req: Request, res: Response) {
    try {
      const { url } = req.body;

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
        const userId = userObject._id;

        const usecase = new GetValidationUserTiktokUsecase();
        const result = await usecase.execute({
          userId,
          url,
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
}
