import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Clip } from "../../../models/clip.model";
import { ClipEntity } from "../../../shared/database/entities/clip.entity";

export class ClipRepository {
  private repository = TypeormConnection.connection.getRepository(ClipEntity);

  public async create(clip: Clip) {
    const taskEntity = this.repository.create({
      id: clip.id,
      url: clip.url,
      views: clip.views,
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
      relations: ["registration"],
    });

    if (result === null) {
      return null;
    }

    return ClipRepository.mapEntityToModel(result);
  }

  public static mapEntityToModel(entity: ClipEntity): Clip {
    const clip = Clip.create(entity.id, entity.url, entity.views);

    return clip;
  }
}
