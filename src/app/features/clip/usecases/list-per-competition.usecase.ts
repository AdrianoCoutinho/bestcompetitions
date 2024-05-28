import axios from "axios";
import { apifyEnv } from "../../../envs/apify.env";
import { Return } from "../../../shared/util/return.contract";
import { ClipRepository } from "../../clip/database/clip.repository";
import { CompetitionRepository } from "../../competition/database/competition.repository";

axios.defaults.baseURL = apifyEnv.secret;

interface IGetUser {
  idCompetition?: string;
}

export class ListPerCompetitionUsecase {
  public async execute(data?: IGetUser): Promise<Return> {
    const competitionRepository = new CompetitionRepository();
    const competitionEmphasis =
      await competitionRepository.getEmphasisCompetition();

    const cliprepository = new ClipRepository();
    const clipList = await cliprepository.listPerCompetition(
      competitionEmphasis
    );

    if (clipList === null) {
      return {
        ok: false,
        code: 404,
        message: "Não há clipes.",
      };
    }

    const result = clipList.reduce((acc: any, video: any) => {
      const email = video.user.email;
      const tiktok = video.user.tiktok;
      const instagram = video.user.instagram;
      const youtube = video.user.youtube;
      if (!acc[email]) {
        acc[email] = { user: email, tiktok, instagram, youtube, views: 0 };
      }
      acc[email].views += video.views;
      return acc;
    }, {});

    const resultArray = Object.values(result);

    return {
      ok: true,
      code: 200,
      message: "Clipes listados com sucesso.",
      data: resultArray,
    };
  }
}
