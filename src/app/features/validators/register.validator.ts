import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../shared/errors/api.error";
import { RequestError } from "../../shared/errors/request.error";
import { UserRepository } from "../user/database/user.repository";

export class RegisterValidator {
  public static async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, email, phone, password } = req.body;

      if (!name) {
        return RequestError.fieldNotProvided(res, "name");
      }

      if (!email) {
        return RequestError.fieldNotProvided(res, "Email");
      }

      if (!phone) {
        return RequestError.fieldNotProvided(res, "name");
      }

      if (!password) {
        return RequestError.fieldNotProvided(res, "password");
      }

      const repository = new UserRepository();
      const usuario = await repository.getByEmail(email);

      if (usuario !== null) {
        return RequestError.invalidData(res, "Email já cadastrado!");
      }

      next();
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }
}
