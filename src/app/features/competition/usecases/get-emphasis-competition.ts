import { Return } from "../../../shared/util/return.contract";
import { CompetitionRepository } from "../database/competition.repository";

export class GetEmphasisCompetition {
  public async execute(): Promise<Return> {
    const repository = new CompetitionRepository();
    const result = await repository.getEmphasisCompetition();

    return {
      ok: true,
      code: 200,
      message: "A Competição destaque foi carregada com sucesso!",
      data: result,
    };
  }
}
