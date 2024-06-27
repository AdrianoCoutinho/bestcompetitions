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

export class ListClipsYoutubeUserUsecase {
  public async execute(data: IGetUser): Promise<Return> {
    let totalViews = 0;
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
    const clipList = await cliprepository.listShortsPerUser(
      data.idUser,
      competitionEmphasis
    );

    if (clipList) {
      totalViews = clipList.reduce((acc, video) => acc + video.views, 0);
    }

    return {
      ok: true,
      code: 200,
      message: "Total views de clipes do youtube listados com sucesso.",
      data: totalViews,
    };
  }
}
