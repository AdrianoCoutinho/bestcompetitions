import { Clip } from "../../../models/clip.model";
import {
  getInstagramReelsVideo,
  getTiktokVideo,
  getYoutubeShortVideo,
} from "../../../shared/apify";
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

    if (clipByUrl) {
      return {
        ok: false,
        code: 400,
        message: "Este clip já está cadastrado.",
      };
    }

    let videoData = [];

    if (data.type === "tiktok") {
      videoData = await getTiktokVideo(data.url);
    }

    if (data.type === "instagram") {
      videoData = await getInstagramReelsVideo(data.url);
    }

    if (data.type === "youtube") {
      videoData = await getYoutubeShortVideo(data.url);
    }

    if (videoData === null) {
      return {
        ok: false,
        code: 404,
        message: "Clipe não encontrado.",
      };
    }

    const competitionHashtag = competition.hashtag;

    if (!videoData[0]) {
      return {
        ok: false,
        code: 404,
        message: "Clipe não encontrado.",
      };
    }

    let hashtags = videoData[0].hashtags;

    let hashtagExists = [];

    if (data.type === "tiktok") {
      hashtagExists = hashtags.find(
        (item: any) => item.name === competitionHashtag
      );
    }

    if (data.type === "instagram") {
      hashtagExists = hashtags.find((item: any) => item === competitionHashtag);
    }

    if (data.type === "youtube") {
      const hashtagsFind = await videoData[0].title.match(/#(\p{L}+)/gu);
      hashtags = videoData[0].title;
      hashtagExists = hashtagsFind.find(
        (item: string) => item === `#${competitionHashtag}`
      );
    }

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
      data.type === "tiktok"
        ? videoData[0].createTimeISO
        : data.type === "instagram"
        ? videoData[0].timestamp
        : data.type === "youtube"
        ? videoData[0].date
        : null,
      data.type === "tiktok"
        ? videoData[0].authorMeta.name
        : data.type === "instagram"
        ? videoData[0].ownerUsername
        : data.type === "youtube"
        ? videoData[0].channelName
        : null,
      data.type === "tiktok"
        ? videoData[0].text
        : data.type === "instagram"
        ? videoData[0].caption
        : data.type === "youtube"
        ? videoData[0].title
        : null,
      data.type === "tiktok"
        ? videoData[0].diggCount
        : data.type === "instagram"
        ? videoData[0].likesCount
        : data.type === "youtube"
        ? videoData[0].likes
        : null,
      data.type === "tiktok"
        ? videoData[0].shareCount
        : data.type === "instagram"
        ? 0
        : data.type === "youtube"
        ? 0
        : null,
      data.type === "tiktok"
        ? videoData[0].submittedVideoUrl
        : data.type === "instagram"
        ? videoData[0].inputUrl
        : data.type === "youtube"
        ? videoData[0].url
        : null,
      data.type === "tiktok"
        ? videoData[0].authorMeta.nickName
        : data.type === "instagram"
        ? videoData[0].ownerFullName
        : data.type === "youtube"
        ? videoData[0].channelName
        : null,
      data.type,
      StatusType.ACTIVE,
      data.type === "tiktok"
        ? videoData[0].playCount
        : data.type === "instagram"
        ? videoData[0].videoPlayCount
        : data.type === "youtube"
        ? videoData[0].viewCount
        : null
    );

    await clipRepository.create(clip);

    return {
      ok: true,
      code: 201,
      message: "O clipe foi adicionado com sucesso.",
      data: videoData,
    };
  }
}
