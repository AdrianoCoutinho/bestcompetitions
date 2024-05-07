import { Return } from "../../../shared/util/return.contract";
import { CompetitionRepository } from "../database/competition.repository";

interface GetCompetitionParams {
  competitionId: string;
}

export class GetCompetitionUsecase {
  public async execute(data: GetCompetitionParams): Promise<Return> {
    const repository = new CompetitionRepository();
    const result = await repository.get(data.competitionId);

    return {
      ok: true,
      code: 200,
      message: "A Competição foi obtida com sucesso.",
      data: result,
    };
  }
}
