import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { ValidateUserUsecase } from "../usecases/validade-user.usecase";
import { validateTiktokUserUsecase } from "../usecases/validate-tiktok-user.usecase";

export class ApifyController {
  public async TiktokUser(req: Request, res: Response) {
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
        const userObject = JSON.parse(authToken); // Converte a string JSON em um objeto JavaScript
        const userId = userObject._id;

        const { username } = req.body;
        const usecase = new ValidateUserUsecase();
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
        const userObject = JSON.parse(authToken); // Converte a string JSON em um objeto JavaScript
        const userId = userObject._id;

        const usecase = new validateTiktokUserUsecase();
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

//   public async listTasks(req: Request, res: Response) {
//     try {
//       const authToken = req.headers["user"];

//       if (!authToken) {
//         return res.status(500).send({
//           ok: false,
//           message: "token não informado",
//         });
//       }

//       if (typeof req.headers["user"] === "string") {
//         const authToken = req.headers["user"] as string;
//         const userObject = JSON.parse(authToken); // Converte a string JSON em um objeto JavaScript
//         const userId = userObject._id;
//         const usecase = new ListTasksUsecase();
//         const result = await usecase.execute(userId);
//         return res.status(result.code).send(result);
//       }

//       return res.status(500).send({
//         ok: false,
//         message: "token inválido",
//       });
//     } catch (error: any) {
//       return ApiError.serverError(res, error);
//     }
//   }
