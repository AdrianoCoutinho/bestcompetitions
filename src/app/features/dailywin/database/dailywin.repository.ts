import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { DayliWin } from "../../../models/dailyWin.model";
import { DailyWinEntity } from "../../../shared/database/entities/dialyWin.entity";
import { CompetitionRepository } from "../../competition/database/competition.repository";
import { UserRepository } from "../../user/database/user.repository";

export class DailyWinRepository {
  private repository =
    TypeormConnection.connection.getRepository(DailyWinEntity);

  public async create(clip: DayliWin) {
    const clipEntity = this.repository.create({
      id: clip.id,
      url: clip.url,
      user: clip.user,
      competition: clip.competition,
      videoDate: clip.videoDate,
      winDate: clip.winDate,
      diggCount: clip.diggCount,
      username: clip.username,
      shareCount: clip.shareCount,
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

    return DailyWinRepository.mapEntityToModel(result);
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

  public static mapEntityToModel(entity: DailyWinEntity): DayliWin {
    const user = UserRepository.mapEntityToModel(entity.user);
    const competition = CompetitionRepository.mapEntityToModel(
      entity.competition
    );

    const clip = DayliWin.create(
      entity.id,
      entity.url,
      user,
      competition,
      entity.videoDate,
      entity.winDate,
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
