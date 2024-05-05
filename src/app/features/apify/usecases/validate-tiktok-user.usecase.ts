import { verifyTiktokUser } from "../../../shared/apify";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";

interface CreateValidationParams {
  userId: string;
  url: string;
}

export class validateTiktokUserUsecase {
  public async execute(data: CreateValidationParams): Promise<Return> {
    const result = await verifyTiktokUser(data.url);
    const cacheRepository = new CacheRepository();
    const hashtag = result[0].hashtags.find((item: any) => {
      return item.name === "volkswagen"; // Utilize 'return' para retornar o resultado da comparação
    });

    if (!hashtag) {
      return {
        ok: false,
        code: 404,
        message: `A hashtag não foi encontrada!`,
        data: result[0].hashtags,
      };
    }

    const username = await new CacheRepository().get(
      `hashtagvalidationUsername${data.userId}`
    );

    await new CacheRepository().delete(`hashtagvalidation${data.userId}`);
    await new CacheRepository().delete(
      `hashtagvalidationUsername${data.userId}`
    );

    return {
      ok: true,
      code: 201,
      message: `Você concluiu a verificação!`,
      data: result[0].hashtags,
    };
  }
}
