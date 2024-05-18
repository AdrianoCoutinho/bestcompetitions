import axios from "axios";
import { apifyEnv } from "../../../envs/apify.env";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../database/user.repository";

axios.defaults.baseURL = apifyEnv.secret;

interface IGetUser {
  idUser: string;
}

export class GetUserUsecase {
  public async execute(data: IGetUser): Promise<Return> {
    const userRepository = new UserRepository();
    const user = await userRepository.get(data.idUser);

    if (!user) {
      return {
        ok: false,
        code: 404,
        message: "Usuário não encontrada.",
      };
    }

    return {
      ok: true,
      code: 200,
      message: "Usuário listado com sucesso.",
      data: user,
    };
  }
}
