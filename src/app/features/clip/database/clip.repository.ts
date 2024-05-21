import { Between } from "typeorm";
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

  public async listDailyWin(idCompetition: string, date: string) {
    if (!idCompetition) {
      return null;
    }

    const initialDate = new Date(date);
    const startDate = new Date(initialDate);
    startDate.setDate(initialDate.getDate() + 1);
    startDate.setHours(0, 0, 0, 0);

    const finalDate = new Date(date);
    const endDate = new Date(finalDate);
    endDate.setDate(initialDate.getDate() + 1);
    endDate.setHours(23, 59, 59, 999);

    const toLocalISOString = (date: any) => {
      const tzOffset = date.getTimezoneOffset() * 60000; // offset in milliseconds
      const localISOTime = new Date(date - tzOffset).toISOString().slice(0, -1);
      return localISOTime;
    };

    console.log("Início do dia:", toLocalISOString(startDate));
    console.log("Fim do dia:", toLocalISOString(endDate));

    const result = await this.repository.find({
      where: {
        idCompetition: idCompetition,
        videoDate: Between(startDate, endDate),
      },
      relations: ["user", "competition"],
      order: {
        views: "DESC",
      },
      take: 10,
    });

    if (result.length === 0) {
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

  public async UpdateView(id: string, data: any) {
    if (!id) {
      return null;
    }

    const result = await this.repository.findOne({
      where: { id },
    });

    if (result === null) {
      return null;
    }

    if (Number.isNaN(data.playcount)) {
      data.playcount = -1;
    }

    result.views = data.playCount;

    result.diggCount = data.diggCount;

    result.shareCount = data.shareCount;

    await this.repository.save(result);
    return result;
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
