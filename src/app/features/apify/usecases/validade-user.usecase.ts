import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";

interface CreateValidationParams {
  username: string;
  userId: string;
}

export class ValidateUserUsecase {
  public async execute(data: CreateValidationParams): Promise<Return> {
    const cacheRepository = new CacheRepository();

    const deleteCacheKey = async () => {
      await new CacheRepository().delete(`hashtagvalidation`);
      await new CacheRepository().delete(`hashtagvalidationVideoUrl`);
    };

    await cacheRepository.set(`hashtagvalidation${data.userId}`, "teste123");
    await cacheRepository.set(
      `hashtagvalidationUsername${data.userId}`,
      data.username
    );
    setTimeout(deleteCacheKey, 60000);

    return {
      ok: true,
      code: 201,
      message: `Solicitação criada! Você tem 1 minuto para criar um video com a hashtag #teste123 e enviar o link aqui`,
      data: data.username,
    };
  }
}
