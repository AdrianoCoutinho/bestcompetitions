import { Request, Response } from "express";
import { ApiError } from "../../../shared/errors/api.error";
import { CreateCompetitionUsecase } from "../usecases/create-competition.usecase";
import { GetCompetitionUsecase } from "../usecases/get-competition.usecase";
import { ListCompetitionsUsecase } from "../usecases/list-competition.usecase";

export class CompetitionController {
  public async create(req: Request, res: Response) {
    try {
      const {
        name,
        initialDate,
        finalDate,
        hashtag,
        tiktok,
        instagram,
        youtube,
      } = req.body;

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

        const usecase = new CreateCompetitionUsecase();
        const result = await usecase.execute({
          name,
          initialDate,
          finalDate,
          hashtag,
          tiktok,
          instagram,
          youtube,
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

  public async getCompetition(req: Request, res: Response) {
    try {
      const { competitionId } = req.params;

      const usecase = new GetCompetitionUsecase();

      const result = await usecase.execute({ competitionId });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

  public async list(req: Request, res: Response) {
    try {
      const usecase = new ListCompetitionsUsecase();

      const result = await usecase.execute();

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

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
