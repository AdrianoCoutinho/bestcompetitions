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
    let totalOfViewsValue = 0;
    const userRepository = new UserRepository();
    const user = await userRepository.get(data.idUser);

    if (!user) {
      return {
        ok: false,
        code: 404,
        message: "Usuário não encontrada.",
      };
    }

    const clipsTotalValue = await userRepository.getClipsTotalValue(
      data.idUser
    );

    const viewsOfTotalClips = await userRepository.getViewsOfClipsTotalValue(
      data.idUser
    );

    if (viewsOfTotalClips.length > 0) {
      totalOfViewsValue = viewsOfTotalClips.reduce((acc: number, clip: any) => {
        return acc + clip.views;
      }, 0);
    }

    return {
      ok: true,
      code: 200,
      message: "Usuário listado com sucesso.",
      data: {
        user: user,
        totalClipsValue: clipsTotalValue,
        totalViewsOfClips: totalOfViewsValue,
      },
    };
  }
}
