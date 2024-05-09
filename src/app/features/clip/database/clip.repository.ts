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
    console.log(typeof id);
    console.log(typeof playcount);
    console.log(id);
    console.log(playcount);

    const clip = await this.repository.findOneBy({
      id,
    });

    console.log(clip);

    if (clip === null) {
      return {
        ok: false,
        code: 404,
        message: "Clip não encontrado",
        data: null,
      };
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
      entity.views
    );

    return clip;
  }
}
