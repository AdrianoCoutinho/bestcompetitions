import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { RegisterUserUsecase } from "../usecases/register.usecase";

export class RegisterController {
  public async create(req: Request, res: Response) {
    try {
      const { email, name, phone, password } = req.body;

      const result = await new RegisterUserUsecase().execute(req.body);

      return res.status(result.code).send(result);
    } catch (error: any) {
      ApiError.serverError(res, error);
    }
  }

  //   public async listall(req: Request, res: Response) {
  //     try {
  //       const result = await new ListAllUsecase().execute();

  //       return res.status(result.code).send(result);
  //     } catch (error: any) {
  //       ApiError.serverError(res, error);
  //     }
  //   }
}
