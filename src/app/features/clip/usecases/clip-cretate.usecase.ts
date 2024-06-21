import { Clip } from "../../../models/clip.model";
import { getTiktokVideo } from "../../../shared/apify";
import { PlatformType, StatusType } from "../../../shared/enum";
import { Return } from "../../../shared/util/return.contract";
import { CompetitionRepository } from "../../competition/database/competition.repository";
import { UserRepository } from "../../user/database/user.repository";
import { ClipRepository } from "../database/clip.repository";

interface CreateClipParams {
  url: string;
  type: PlatformType;
  idUser: string;
  idCompetition: string;
}

export class CreateClipUsecase {
  public async execute(data: CreateClipParams): Promise<Return> {
    const userRepository = new UserRepository();
    const user = await userRepository.get(data.idUser);

    const competitionRepository = new CompetitionRepository();
    const competition = await competitionRepository.get(data.idCompetition);

    const clipRepository = new ClipRepository();
    const clipByUrl = await clipRepository.getByUrl(data.url);

    if (!user) {
      return {
        ok: false,
        code: 404,
        message: "Usuário não encontrado.",
      };
    }

    if (!competition) {
      return {
        ok: false,
        code: 404,
        message: "Competição não encontrada.",
      };
    }

    // if (clipByUrl) {
    //   return {
    //     ok: false,
    //     code: 400,
    //     message: "Este clip já está cadastrado.",
    //   };
    // }

    const videoData = await getTiktokVideo(data.url);

    if (videoData.ok === false) {
      return {
        ok: false,
        code: 400,
        message: "Clipe não encontrado.",
      };
    }

    const competitionHashtag = competition.hashtag;
    const hashtags = videoData[0].hashtags;

    const hashtagExists = hashtags.find(
      (item: any) => item.name === competitionHashtag
    );

    if (!hashtagExists) {
      return {
        ok: false,
        code: 404,
        message: `Não foi encontrada a hashtag "${competitionHashtag}"`,
        data: hashtags,
      };
    }

    const clip = new Clip(
      data.url,
      user,
      competition,
      videoData[0].createTimeISO,
      videoData[0].authorMeta.name,
      videoData[0].text,
      videoData[0].diggCount,
      videoData[0].shareCount,
      videoData[0].submittedVideoUrl,
      videoData[0].authorMeta.nickName,
      data.type,
      StatusType.PENDING,
      videoData[0].playCount
    );

    await clipRepository.create(clip);

    return {
      ok: true,
      code: 201,
      message: "O clipe foi adicionado com sucesso.",
      data: clip,
    };
  }
}
