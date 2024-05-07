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
      idUser: competition.idUser,
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
      relations: ["idUser"],
    });

    if (result === null) {
      return null;
    }

    return CompetitionRepository.mapEntityToModel(result);
  }

  public async list() {
    const result = await this.repository.find({
      relations: ["idUser"],
    });

    return result.map((item) => CompetitionRepository.mapEntityToModel(item));
  }

  public async addParticipant(id: string) {
    const competition = await this.repository.findOneBy({
      id,
    });

    if (competition === null) {
      return {
        ok: false,
        code: 404,
        message: "Competição não encontrada",
        data: null,
      };
    }
    competition.participants += 1;
    await this.repository.save(competition);

    return competition.tiktok;
  }

  public static mapEntityToModel(entity: CompetitionEntity): Competition {
    const competition = Competition.create(
      entity.id,
      entity.name,
      entity.initialDate,
      entity.finalDate,
      entity.hashtag,
      entity.idUser,
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
