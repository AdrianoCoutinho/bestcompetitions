import { verifyTiktokUser } from "../../../shared/apify";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../../user/database/user.repository";

interface CreateValidationParams {
  userId: string;
  url: string;
}

export class validateTiktokUserUsecase {
  public async execute(data: CreateValidationParams): Promise<Return> {
    const result = await verifyTiktokUser(data.url);
    const cacheRepository = new CacheRepository();
    const user = new UserRepository();
    const hashtagID = cacheRepository.get(`hashtagvalidation${data.userId}`);

    const hashtag = result[0].hashtags.find((item: any) => {
      return item.name === hashtagID;
    });

    if (!hashtag) {
      return {
        ok: false,
        code: 404,
        message: `A hashtag não foi encontrada!`,
        data: result[0].hashtags,
      };
    }

    const checkedUsername = await user.changeUsernameTiktok(
      data.userId,
      result[0].authorMeta.name
    );

    await new CacheRepository().delete(`hashtagvalidation${data.userId}`);
    await new CacheRepository().delete(
      `hashtagvalidationUsername${data.userId}`
    );

    return {
      ok: true,
      code: 201,
      message: `Você concluiu a verificação!`,
      data: checkedUsername,
    };
  }
}
