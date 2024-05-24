import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { DailyWin } from "../../../models/dailyWin.model";
import { DailyWinEntity } from "../../../shared/database/entities/dialyWin.entity";
import { CompetitionRepository } from "../../competition/database/competition.repository";

export class DailyWinRepository {
  private repository =
    TypeormConnection.connection.getRepository(DailyWinEntity);

  public async create(clip: DailyWin) {
    const clipEntity = this.repository.create({
      id: clip.id,
      winDate: clip.winDate,
      data: clip.data,
      competition: clip.competition,
    });

    const result = await this.repository.save(clipEntity);
    return DailyWinRepository.mapEntityToModel(result);
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

  public async listPerCompetition(idCompetition: string) {
    if (!idCompetition) {
      return null;
    }

    const result = await this.repository.find({
      where: {
        idCompetition: idCompetition,
      },
      relations: ["competition"],
    });

    if (result === null) {
      return null;
    }

    return result;
  }

  public static mapEntityToModel(entity: DailyWinEntity): DailyWin {
    const competition = CompetitionRepository.mapEntityToModel(
      entity.competition
    );

    const clip = DailyWin.create(
      entity.id,
      entity.winDate,
      entity.data,
      competition
    );

    return clip;
  }
}
