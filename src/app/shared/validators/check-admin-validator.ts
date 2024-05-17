import { NextFunction, Request, Response } from "express";
import { Typeuser } from "../../models/user.model";
import { ApiError } from "../errors/api.error";

export const checkAdminValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usuario = req.headers["user"] as string;

    if (!usuario) {
      return res.status(401).send({
        ok: false,
        message: "Usuário não logado",
      });
    }

    const decodedUsuario = JSON.parse(usuario);
    if (decodedUsuario.Typeuser !== Typeuser.Admin) {
      return res.status(403).send({
        ok: false,
        message: "Usuário não possui permissão",
      });
    }
    return next();
  } catch (error: any) {
    return ApiError.serverError(res, error);
  }
};
