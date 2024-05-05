import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/api.error";
import { JwtAdapter } from "../util/jwt.adapter";

export const checkLoginValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"];
    req.headers["user"] = "";

    if (!token) {
      return res.status(401).send({
        ok: false,
        message: "Token não foi infomardo",
      });
    }

    const user = JwtAdapter.checkToken(token);
    req.headers["user"] = JSON.stringify(user);

    return next();
  } catch (error: any) {
    return ApiError.serverError(res, error);
  }
};
