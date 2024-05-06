import { v4 as uuidv4 } from "uuid";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";

interface CreateValidationParams {
  userId: string;
}

export class ValidateUserUsecase {
  public async execute(data: CreateValidationParams): Promise<Return> {
    const cacheRepository = new CacheRepository();

    const originalUuid = uuidv4();
    const truncatedUuid = originalUuid.slice(0, 8);
    console.log("UUID truncado:", truncatedUuid);

    const deleteCacheKey = async () => {
      await new CacheRepository().delete(`hashtagvalidation`);
      await new CacheRepository().delete(`hashtagvalidationVideoUrl`);
    };

    await cacheRepository.set(`hashtagvalidation${data.userId}`, truncatedUuid);
    setTimeout(deleteCacheKey, 60000);

    return {
      ok: true,
      code: 201,
      message: `Solicitação criada! Você tem 1 minuto para criar um video com a hashtag ${truncatedUuid}`,
      data: truncatedUuid,
    };
  }
}
