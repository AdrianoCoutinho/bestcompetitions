import { Return } from "../../../shared/util/return.contract";
import { CompetitionRepository } from "../database/competition.repository";

interface GetCompetitionParams {
  competitionId: string;
}

export class GetEmphasisCompetition {
  public async execute(data: GetCompetitionParams): Promise<Return> {
    const repository = new CompetitionRepository();
    const result = await repository.getEmphasisCompetition(data.competitionId);

    return {
      ok: true,
      code: 200,
      message: "A Competição destaque foi carregada com sucesso!",
      data: result,
    };
  }
}
