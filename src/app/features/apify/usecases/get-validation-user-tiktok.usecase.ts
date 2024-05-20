import { verifyTiktokUser } from "../../../shared/apify";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../../user/database/user.repository";

interface CreateValidationParams {
  userId: string;
  url: string;
}

export class GetValidationUserTiktokUsecase {
  public async execute(data: CreateValidationParams): Promise<Return> {
    const result = await verifyTiktokUser(data.url);
    const cacheRepository = new CacheRepository();

    const user = new UserRepository();

    const hashtaExists = await cacheRepository.get(
      `hashtagvalidation${data.userId}`
    );

    const hashtags = result[0].hashtags;

    if (!hashtags) {
      return {
        ok: false,
        code: 400,
        message: `Video não disponível, verifique o video novamente.`,
      };
    }

    const hashtagExists = result[0].hashtags.find((item: any) => {
      return item.name === hashtaExists;
    });

    if (!hashtagExists) {
      return {
        ok: false,
        code: 404,
        message: `A hashtag não foi encontrada!`,
        data: hashtaExists,
        hashtags: result[0].hashtags,
      };
    }

    await user.changeUsernameTiktok(data.userId, result[0].authorMeta.name);

    let tiktokUserCache = await cacheRepository.get(`tiktokAccounts`);

    let tiktokUserCacheList = JSON.parse(tiktokUserCache);

    tiktokUserCacheList.push(data.userId);

    await cacheRepository.set(
      `tiktokAccounts`,
      JSON.stringify(tiktokUserCacheList)
    );

    return {
      ok: true,
      code: 201,
      message: `Você concluiu a verificação!`,
      data: result[0].hashtags,
    };
  }
}
