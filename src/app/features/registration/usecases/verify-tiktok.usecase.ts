import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";

export class VerifyTiktokUsecase {
  public async execute(idUser: string): Promise<Return> {
    const cacheRepository = new CacheRepository();

    let tiktokUserCache = await cacheRepository.get(`tiktokAccounts`);

    if (!tiktokUserCache) {
      await cacheRepository.set(`tiktokAccounts`, "[]");
    }

    let tiktokist = JSON.parse(tiktokUserCache);

    let idExists = tiktokist.find((item: string) => {
      return item === idUser;
    });

    if (idExists) {
      return {
        ok: true,
        code: 200,
        message: "Tiktok verificado",
      };
    }

    return {
      ok: false,
      code: 401,
      message: "Tiktok não verificado!",
    };
  }
}
