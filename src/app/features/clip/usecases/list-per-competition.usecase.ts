import axios from "axios";
import { apifyEnv } from "../../../envs/apify.env";
import { Return } from "../../../shared/util/return.contract";
import { ClipRepository } from "../../clip/database/clip.repository";

axios.defaults.baseURL = apifyEnv.secret;

interface IGetUser {
  idCompetition: string;
}

export class ListPerCompetitionUsecase {
  public async execute(data: IGetUser): Promise<Return> {
    const cliprepository = new ClipRepository();
    const clipList = await cliprepository.listPerCompetition(
      data.idCompetition
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

    resultArray.sort((a: any, b: any) => b.views - a.views);

    return {
      ok: true,
      code: 200,
      message: "Clipes listados com sucesso.",
      data: resultArray,
    };
  }
}
