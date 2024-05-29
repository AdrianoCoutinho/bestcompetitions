import { Competition } from "../../../models/competition.model";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../../user/database/user.repository";
import { CompetitionRepository } from "../database/competition.repository";

interface CreateCompetitionParams {
  name: string;
  initialDate: Date;
  finalDate: Date;
  hashtag: string;
  description: string;
  thumbnailPhone: string;
  thumbnailDesktop: string;
  tiktok: string;
  instagram: string;
  youtube: string;
  idUser: string;
}

export class CreateCompetitionUsecase {
  public async execute(data: CreateCompetitionParams): Promise<Return> {
    const userRepository = new UserRepository();
    const user = await userRepository.get(data.idUser);

    if (!user) {
      return {
        ok: false,
        code: 404,
        message: "Usuário não encontrado.",
      };
    }

    const competition = new Competition(
      data.name,
      data.initialDate,
      data.finalDate,
      data.hashtag,
      user,
      data.description,
      data.thumbnailPhone,
      data.thumbnailDesktop,
      "ninguém",
      0,
      data.tiktok,
      data.instagram,
      data.youtube,
      true
    );

    const repository = new CompetitionRepository();
    await repository.create(competition);

    return {
      ok: true,
      code: 201,
      message: "A Competição foi criada com sucesso.",
      data: competition,
    };
  }
}
