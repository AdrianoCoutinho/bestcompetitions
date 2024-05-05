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

  //   public async updateTask(req: Request, res: Response) {
  //     try {
  //       const { idTask } = req.params;
  //       const { title, description } = req.body;

  //       const usecase = new UpdateTaskUsecase();

  //       const result = await usecase.execute({ idTask, title, description });

  //       return res.status(result.code).send(result);
  //     } catch (error: any) {
  //       return ApiError.serverError(res, error);
  //     }
  //   }

  //   public async changeStatus(req: Request, res: Response) {
  //     try {
  //       const { idTask } = req.params;
  //       const usecase = new UpdateStatusTaskUsecase();

  //       const result = await usecase.execute(idTask);

  //       return res.status(result.code).send(result);
  //     } catch (error: any) {
  //       return ApiError.serverError(res, error);
  //     }
  //   }

  //   public async deleteTask(req: Request, res: Response) {
  //     try {
  //       const { idTask } = req.params;
  //       const usecase = new DeleteTaskUsecase();

  //       const result = await usecase.execute(idTask);

  //       return res.status(result.code).send(result);
  //     } catch (error: any) {
  //       return ApiError.serverError(res, error);
  //     }
  //   }
}
