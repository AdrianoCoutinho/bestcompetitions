import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Competition } from "../../../models/competition.model";
import { CompetitionEntity } from "../../../shared/database/entities/competition.entity";

export class CompetitionRepository {
  private repository =
    TypeormConnection.connection.getRepository(CompetitionEntity);

  public async create(competition: Competition) {
    const taskEntity = this.repository.create({
      id: competition.id,
      name: competition.name,
      initialDate: competition.initialDate,
      finalDate: competition.finalDate,
      hashtag: competition.hashtag,
      winner: competition.winner,
      participants: competition.participants,
      tiktok: competition.tiktok,
      instagram: competition.instagram,
      youtube: competition.youtube,
      indActive: competition.indActive,
    });

    await this.repository.save(taskEntity);
  }

  public async get(id: string) {
    if (!id) {
      return null;
    }

    const result = await this.repository.findOne({
      where: {
        id,
      },
      relations: ["user"],
    });

    if (result === null) {
      return null;
    }

    return CompetitionRepository.mapEntityToModel(result);
  }

  public static mapEntityToModel(entity: CompetitionEntity): Competition {
    const competition = Competition.create(
      entity.id,
      entity.name,
      entity.initialDate,
      entity.finalDate,
      entity.hashtag,
      entity.winner,
      entity.participants,
      entity.tiktok,
      entity.instagram,
      entity.youtube,
      entity.indActive
    );

    return competition;
  }
}
