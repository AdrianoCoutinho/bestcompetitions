import { Registration } from "../../../models/registrations.model";
import { CacheRepository } from "../../../shared/database/repositories/cache.repository";
import { Return } from "../../../shared/util/return.contract";
import { CompetitionRepository } from "../../competition/database/competition.repository";
import { UserRepository } from "../../user/database/user.repository";
import { RegistrationRepository } from "../database/registration.repository";

interface CreateRegistrationParams {
  idCompetition: string;
  idUser: string;
}

export class CreateRegistrationUsecase {
  public async execute(data: CreateRegistrationParams): Promise<Return> {
    const cacheRepository = new CacheRepository();

    let participantsCache = await cacheRepository.get(`participants`);

    if (!participantsCache) {
      await cacheRepository.set(`participants`, "[]");
    }

    let participantlist = JSON.parse(participantsCache);

    let idExists = participantlist.find((item: string) => {
      return item === data.idUser;
    });

    if (idExists) {
      return {
        ok: false,
        code: 401,
        message: "Você já está participando desta competição.",
      };
    }

    const userRepository = new UserRepository();
    const user = await userRepository.get(data.idUser);

    if (!user) {
      return {
        ok: false,
        code: 404,
        message: "Usuário não encontrado.",
      };
    }

    const competitionRepository = new CompetitionRepository();
    const competition = await competitionRepository.get(data.idCompetition);

    if (!competition) {
      return {
        ok: false,
        code: 404,
        message: "Competição não encontrada.",
      };
    }

    const repository = new RegistrationRepository();

    const regisExists = await repository.getByUserId(data.idUser);

    if (regisExists) {
      return {
        ok: false,
        code: 401,
        message: "Você já está inscrito nessa competição",
      };
    }

    const registration = new Registration(user.id, competition.id);

    await repository.create(registration);

    await competitionRepository.addParticipant(competition.id);

    participantlist.push(data.idUser);

    await cacheRepository.set(`participants`, JSON.stringify(participantlist));

    return {
      ok: true,
      code: 201,
      message: "A inscrição foi criada com sucesso.",
      data: "registration",
    };
  }
}
