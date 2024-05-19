import { v4 as uuidv4 } from "uuid";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";

interface CreateValidationParams {
  userId: string;
}

export class CreateValidationUserTiktokUsecase {
  public async execute(data: CreateValidationParams): Promise<Return> {
    const cacheRepository = new CacheRepository();

    const hashtaExists = await cacheRepository.get(
      `hashtagvalidation${data.userId}`
    );
    if (hashtaExists) {
      return {
        ok: true,
        code: 201,
        message: `Solicitação criada! Você tem 15 minutos para criar um video com a hashtag ${hashtaExists}`,
        data: hashtaExists,
      };
    }

    const originalUuid = uuidv4();
    const truncatedUuid = originalUuid.slice(0, 8);

    await cacheRepository.set(
      `hashtagvalidation${data.userId}`,
      truncatedUuid,
      900
    );

    return {
      ok: true,
      code: 201,
      message: `Solicitação criada! Você tem 1 minuto para criar um video com a hashtag ${truncatedUuid}`,
      data: truncatedUuid,
    };
  }
}
