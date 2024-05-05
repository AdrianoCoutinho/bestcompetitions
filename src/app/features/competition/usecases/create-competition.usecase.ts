import { Competition } from "../../../models/competition.model";
import { Return } from "../../../shared/util/return.contract";
import { CompetitionRepository } from "../database/competition.repository";

interface CreateCompetitionParams {
  name: string;
  initialDate: Date;
  finalDate: Date;
  hashtag: string;
  tiktok: string;
  instagram: string;
  youtube: string;
}

export class CreateCompetitionUsecase {
  public async execute(data: CreateCompetitionParams): Promise<Return> {
    const task = new Competition(
      data.name,
      data.initialDate,
      data.finalDate,
      data.hashtag
    );

    const repository = new CompetitionRepository();
    await repository.create(task);

    return {
      ok: true,
      code: 201,
      message: "A Competição foi criada com sucesso.",
      data: task,
    };
  }
}
