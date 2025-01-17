import { Request, Response } from "express";
import Queue from "../../../queues/queue";
import { ApiError } from "../../../shared/errors/api.error";
import { GetAllViewsDailyUsecase } from "../usecases/get-all-views-daily.usecase";
import { GetAllViewsUsecase } from "../usecases/get-all-views.usecase";
import { ListClipsInstagramUserUsecase } from "../usecases/list-clips-instagram-user.usecase";
import { ListClipsTiktokUserUsecase } from "../usecases/list-clips-tiktok-user.usecase";
import { ListClipsYoutubeUserUsecase } from "../usecases/list-clips-youtube-user.usecase";
import { ListPerCompetitionUsecase } from "../usecases/list-per-competition.usecase";
import { ListPerUserUsecase } from "../usecases/list-per-user.usecase";

export class ClipController {
  public async create(req: Request, res: Response) {
    try {
      const { url, idCompetition, type } = req.body;

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

        await Queue.add({ url, type, idCompetition, idUser });
        return res.status(200).send({
          ok: true,
          code: 200,
          message: "Seu video foi adicionado para análise.",
        });
      }

      return res.status(500).send({
        ok: false,
        message: "erro, contate o administrador",
      });
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

  public async getAllIds(req: Request, res: Response) {
    try {
      const { idCompetition } = req.body;

      const usecase = new GetAllViewsUsecase();
      const result = await usecase.execute({ idCompetition });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

  public async getAllIdsDaily(req: Request, res: Response) {
    try {
      const { idCompetition, date } = req.body;

      const usecase = new GetAllViewsDailyUsecase();
      const result = await usecase.execute({ idCompetition, date });

      return res.status(result.code).send(result);
    } catch (error: any) {
      return ApiError.serverError(res, error);
    }
  }

  public async listPerUser(req: Request, res: Response) {
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

        const usecase = new ListPerUserUsecase();
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

  public async listTiktokClipsTotal(req: Request, res: Response) {
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

        const usecase = new ListClipsTiktokUserUsecase();
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

  public async listInstagramClipsTotal(req: Request, res: Response) {
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

        const usecase = new ListClipsInstagramUserUsecase();
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

  public async listYoutubeClipsTotal(req: Request, res: Response) {
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

        const usecase = new ListClipsYoutubeUserUsecase();
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

  public async listPerCompetition(req: Request, res: Response) {
    try {
      const { idCompetition } = req.body;

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

        const usecase = new ListPerCompetitionUsecase();
        const result = await usecase.execute({ idCompetition });
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
