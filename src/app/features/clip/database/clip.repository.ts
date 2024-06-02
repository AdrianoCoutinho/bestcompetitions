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
      description: clip.description,
      shareCount: clip.shareCount, // Correção aqui: shareCount em vez de sharecount
      avatarUrl: clip.avatarUrl,
      videoUrl: clip.videoUrl,
      nickname: clip.nickname,
      views: clip.views,
    });

    try {
      const result = await this.repository.save(clipEntity);
      return ClipRepository.mapEntityToModel(result);
    } catch (error) {
      console.error("Error saving clip:", error);
      throw error;
    }
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

  public async listPerUser(idUser: string, idCompetition?: string) {
    const result = await this.repository.find({
      where: {
        idUser: idUser,
        idCompetition: idCompetition,
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

    const startDate = new Date(`${date}T03:00:00.000Z`);
    // startDate.setHours(startDate.getHours() + 3);
    const endDate = new Date(`${date}T23:59:59.999Z`);
    endDate.setHours(startDate.getHours() + 23);

    console.log(startDate);
    console.log(endDate);

    const result = await this.repository.find({
      where: {
        idCompetition: idCompetition,
        videoDate: Between(startDate, endDate),
      },
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

  public async updateView(id: string, data: any) {
    if (!id) {
      return null;
    }

    const result = await this.repository.findOne({
      where: { id },
    });

    if (result === null) {
      return null;
    }

    if (Number.isNaN(data.playCount)) {
      data.playCount = -1;
    }

    result.views = data.playCount;

    result.diggCount = data.diggCount;

    result.shareCount = data.shareCount;

    try {
      await this.repository.save(result);
      return result;
    } catch (error) {
      console.error("Error updating clip:", error);
      throw error;
    }
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
      entity.description,
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
