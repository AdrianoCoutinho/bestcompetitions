import { Clip } from "../../../models/clip.model";
import { Return } from "../../../shared/util/return.contract";
import { CompetitionRepository } from "../../competition/database/competition.repository";
import { UserRepository } from "../../user/database/user.repository";
import { ClipRepository } from "../database/clip.repository";

interface CreateClipParams {
  url: string;
  idUser: string;
  idCompetition: string;
}

export class CreateClipUsecase {
  public async execute(data: CreateClipParams): Promise<Return> {
    const userRepository = new UserRepository();
    const user = await userRepository.get(data.idUser);

    const competitionRepository = new CompetitionRepository();
    const competition = await competitionRepository.get(data.idCompetition);

    if (!user) {
      return {
        ok: false,
        code: 404,
        message: "Usuário não encontrado.",
      };
    }

    if (!competition) {
      return {
        ok: false,
        code: 404,
        message: "Competição não encontrada.",
      };
    }

    const clip = new Clip(data.url, user, competition);

    const repository = new ClipRepository();
    await repository.create(clip);

    return {
      ok: true,
      code: 201,
      message: "O clip foi criado com sucesso.",
      data: clip,
    };
  }
}
