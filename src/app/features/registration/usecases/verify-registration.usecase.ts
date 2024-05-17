import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";

export class VerifyRegistrationUsecase {
  public async execute(idUser: string): Promise<Return> {
    const cacheRepository = new CacheRepository();

    let participantsCache = await cacheRepository.get(`participants`);

    if (!participantsCache) {
      await cacheRepository.set(`participants`, "[]");
    }

    let participantlist = JSON.parse(participantsCache);

    let idExists = participantlist.find((item: string) => {
      return item === idUser;
    });

    if (idExists) {
      return {
        ok: false,
        code: 401,
        message: "Já está participando da competição",
      };
    }

    return {
      ok: true,
      code: 200,
      message: "A inscrição está aberta.",
    };
  }
}
