import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Competition } from "../../../models/competition.model";
import { CompetitionEntity } from "../../../shared/database/entities/competition.entity";
import { UserRepository } from "../../user/database/user.repository";

export class CompetitionRepository {
  private repository =
    TypeormConnection.connection.getRepository(CompetitionEntity);

  public async create(competition: Competition) {
    const clipEntity = this.repository.create({
      id: competition.id,
      name: competition.name,
      initialDate: competition.initialDate,
      finalDate: competition.finalDate,
      hashtag: competition.hashtag,
      idUser: competition.user.id,
      winner: competition.winner,
      participants: competition.participants,
      tiktok: competition.tiktok,
      instagram: competition.instagram,
      youtube: competition.youtube,
      indActive: competition.indActive,
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
      relations: ["user"],
    });

    if (result === null) {
      return null;
    }

    return CompetitionRepository.mapEntityToModel(result);
  }

  public async list() {
    const result = await this.repository.find();

    if (result === null) {
      return null;
    }

    return result;
  }

  public static mapEntityToModel(entity: CompetitionEntity): Competition {
    const user = UserRepository.mapEntityToModel(entity.user);

    const competition = Competition.create(
      entity.id,
      entity.name,
      entity.initialDate,
      entity.finalDate,
      entity.hashtag,
      user,
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
