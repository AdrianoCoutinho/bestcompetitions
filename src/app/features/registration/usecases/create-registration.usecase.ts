import { Registration } from "../../../models/registrations.model";
import { Return } from "../../../shared/util/return.contract";
import { CompetitionRepository } from "../../competition/database/competition.repository";
import { UserRepository } from "../../user/database/user.repository";
import { RegistrationRepository } from "../database/registration.database";

interface CreateRegistrationParams {
  idUser: string;
  idCompetition: string;
}

export class CreateRegistrationUsecase {
  public async execute(data: CreateRegistrationParams): Promise<Return> {
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

    const registration = new Registration(user.id, competition.id);

    const repository = new RegistrationRepository();
    await repository.create(registration);

    return {
      ok: true,
      code: 201,
      message: "A inscrição foi criada com sucesso.",
      data: registration,
    };
  }
}
