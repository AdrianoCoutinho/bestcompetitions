import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { RequestError } from "../../../shared/errors/request.error";
import { UserRepository } from "../../user/database/user.repository";

export class CreateClipValitador {
  public static async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
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
        const repository = new UserRepository();
        const usuario = await repository.get(idUser);
        if (!usuario?.tiktok) {
          return RequestError.invalidData(
            res,
            "Você não validou seu username do tiktok!"
          );
        }
      }

      if (!url) {
        return RequestError.fieldNotProvided(res, "url");
      }

      if (!idCompetition) {
        return RequestError.fieldNotProvided(res, "id da competição");
      }

      next();
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
