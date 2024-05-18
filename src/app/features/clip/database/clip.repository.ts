import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Clip } from "../../../models/clip.model";
import { ClipEntity } from "../../../shared/database/entities/clip.entity";
import { CompetitionRepository } from "../../competition/database/competition.repository";
import { UserRepository } from "../../user/database/user.repository";

export class ClipRepository {
  private repository = TypeormConnection.connection.getRepository(ClipEntity);

  public async create(clip: Clip) {
    const clipEntity = this.repository.create({
      id: clip.id,
      url: clip.url,
      user: clip.user,
      competition: clip.competition,
      videoDate: clip.videoDate,
      diggCount: clip.diggCount,
      username: clip.username,
      shareCount: clip.sharecount,
      avatarUrl: clip.avatarUrl,
      videoUrl: clip.videoUrl,
      nickname: clip.nickname,
      views: clip.views,
    });

    await this.repository.save(clipEntity);
  }

  public async get(id: string) {
    if (!id) {
      return null;
    }

    const result = await this.repository.findOne({
      where: {
        id,
      },
      relations: ["user", "competition"],
    });

    if (result === null) {
      return null;
    }

    return ClipRepository.mapEntityToModel(result);
  }

  public async listPerUser(idUser: string) {
    if (!idUser) {
      return null;
    }

    const result = await this.repository.find({
      where: {
        idUser: idUser,
      },
      relations: ["user", "competition"],
    });

    if (result === null) {
      return null;
    }

    return result;
  }

  public async listPerCompetition(idCompetition: string) {
    if (!idCompetition) {
      return null;
    }

    const result = await this.repository.find({
      where: {
        idCompetition: idCompetition,
      },
      relations: ["user", "competition"],
    });

    if (result === null) {
      return null;
    }

    return result;
  }

  public async getViews(idCompetition: string) {
    if (!idCompetition) {
      return null;
    }

    const result = await this.repository.find({
      where: {
        idCompetition: idCompetition,
      },
      relations: ["user", "competition"],
    });

    if (result === null) {
      return null;
    }

    return result;
  }

  public async UpdateView(id: string, playcount: number) {
    const clip = await this.repository.findOneBy({
      id,
    });

    if (clip === null) {
      return {
        ok: false,
        code: 404,
        message: "Clip não encontrado",
        data: null,
      };
    }

    if (Number.isNaN(playcount)) {
      playcount = -1;
    }

    clip.views = playcount;
    await this.repository.save(clip);

    return clip.views;
  }

  public static mapEntityToModel(entity: ClipEntity): Clip {
    const user = UserRepository.mapEntityToModel(entity.user);
    const competition = CompetitionRepository.mapEntityToModel(
      entity.competition
    );

    const clip = Clip.create(
      entity.id,
      entity.url,
      user,
      competition,
      entity.videoDate,
      entity.username,
      entity.diggCount,
      entity.shareCount,
      entity.avatarUrl,
      entity.videoUrl,
      entity.nickname,
      entity.views
    );

    return clip;
  }
}
