import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { GetUserUsecase } from "../usecases/get-user.usecase";

export class UserController {
  public async get(req: Request, res: Response) {
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

        const usecase = new GetUserUsecase();
        const result = await usecase.execute({ idUser });
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
