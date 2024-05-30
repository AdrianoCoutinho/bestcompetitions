import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { DailyWin } from "../../../models/dailyWin.model";
import { DailyWinEntity } from "../../../shared/database/entities/dailyWin.entity";
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

  public async list() {
    const result = await this.repository.find();

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
