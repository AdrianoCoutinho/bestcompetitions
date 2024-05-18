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

    const hashtagID = sessionStorage.getItem(`hashtagvalidation${data.userId}`);

    const hashtag = result[0].hashtags.find((item: any) => {
      return item.name === hashtagID;
    });

    if (!hashtag) {
      return {
        ok: false,
        code: 404,
        message: `A hashtag não foi encontrada!`,
        data: hashtagID,
        hashtags: result[0].hashtags,
      };
    }

    const checkedUsername = await user.changeUsernameTiktok(
      data.userId,
      result[0].authorMeta.name
    );

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
