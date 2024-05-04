import { JwtAdapter } from "../../../shared/util/jwt.adapter";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../../user/database/user.repository";

interface LoginParams {
  email: string;
  password: string;
}

export class LoginUsecase {
  public async execute(data: LoginParams): Promise<Return> {
    const repository = new UserRepository();
    const usuario = await repository.getByEmail(data.email, data.password);

    if (!usuario) {
      return {
        ok: false,
        message: "Email ou senha incorretos!",
        code: 401,
      };
    }

    if (usuario.password != data.password) {
      return {
        ok: false,
        message: "Email ou senha incorretos!",
        code: 401,
      };
    }

    const token = JwtAdapter.createToken(usuario.toJson());

    return {
      ok: true,
      message: "Login feito com sucesso",
      data: {
        ...usuario,
        token,
      },
      code: 200,
    };
  }
}
