import axios from "axios";
import { apifyEnv } from "../../../envs/apify.env";
import { Return } from "../../../shared/util/return.contract";
import { ClipRepository } from "../../clip/database/clip.repository";
import { CompetitionRepository } from "../../competition/database/competition.repository";
import { UserRepository } from "../../user/database/user.repository";

axios.defaults.baseURL = apifyEnv.secret;

interface IGetUser {
  idUser: string;
}

export class ListPerUserUsecase {
  public async execute(data: IGetUser): Promise<Return> {
    const userRepository = new UserRepository();
    const competitionRepository = new CompetitionRepository();
    const user = await userRepository.get(data.idUser);
    const competitionEmphasis =
      await competitionRepository.getEmphasisCompetition();

    if (!user) {
      return {
        ok: false,
        code: 404,
        message: "Usuário não encontrada.",
      };
    }

    const cliprepository = new ClipRepository();
    const clipList = await cliprepository.listPerUser(
      data.idUser,
      competitionEmphasis
    );

    return {
      ok: true,
      code: 200,
      message: "Clipes listados com sucesso.",
      data: clipList,
    };
  }
}
