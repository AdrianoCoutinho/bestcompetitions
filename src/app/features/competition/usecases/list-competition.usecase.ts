import { Return } from "../../../shared/util/return.contract";
import { CompetitionRepository } from "../database/competition.repository";

export class ListCompetitionsUsecase {
  public async execute(): Promise<Return> {
    const repository = new CompetitionRepository();
    const result = await repository.list();

    return {
      ok: true,
      code: 200,
      message: "As Competições foram obtidas com sucesso.",
      data: result,
    };
  }
}
