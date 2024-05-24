import { Clip } from "../../../models/clip.model";
import { getTiktokVideo } from "../../../shared/apify";
import { Return } from "../../../shared/util/return.contract";
import { CompetitionRepository } from "../../competition/database/competition.repository";
import { UserRepository } from "../../user/database/user.repository";
import { ClipRepository } from "../database/clip.repository";

interface CreateClipParams {
  url: string;
  idUser: string;
  idCompetition: string;
}

export class CreateClipUsecase {
  public async execute(data: CreateClipParams): Promise<Return> {
    const userRepository = new UserRepository();
    const user = await userRepository.get(data.idUser);

    const competitionRepository = new CompetitionRepository();
    const competition = await competitionRepository.get(data.idCompetition);

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

    const videoData = await getTiktokVideo(data.url);

    if (!videoData.ok) {
      return {
        ok: false,
        code: 400,
        message: `Url invalida, verifique-a e tente novamente.`,
      };
    }

    const competitionHashtag = competition.hashtag;
    const hashtags = videoData[0].hashtags;

    if (!hashtags) {
      return {
        ok: false,
        code: 400,
        message: `Video não disponível, verifique o video novamente.`,
      };
    }

    const hashtagExists = hashtags.find((item: any) => {
      return item.name === competitionHashtag;
    });

    if (!hashtagExists) {
      return {
        ok: false,
        code: 404,
        message: `Não foi encontrada a hastag "${competitionHashtag}"`,
        data: hashtags,
      };
    }

    const clip = new Clip(
      data.url,
      user,
      competition,
      videoData[0].createTimeISO,
      videoData[0].authorMeta.name,
      videoData[0].diggCount,
      videoData[0].shareCount,
      videoData[0].authorMeta.avatar,
      videoData[0].submittedVideoUrl,
      videoData[0].authorMeta.nickName,
      videoData[0].playCount
    );

    const repository = new ClipRepository();

    await repository.create(clip);

    return {
      ok: true,
      code: 201,
      message: "O clip foi criado com sucesso.",
      data: clip,
    };
  }
}
