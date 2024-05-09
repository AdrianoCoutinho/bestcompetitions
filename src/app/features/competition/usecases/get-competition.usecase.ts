import { ClipEntity } from "../../../shared/database/entities/clip.entity";
import { Return } from "../../../shared/util/return.contract";
import { ClipRepository } from "../../clip/database/clip.repository";
import { CompetitionRepository } from "../database/competition.repository";

interface GetCompetitionParams {
  competitionId: string;
}

export class GetCompetitionUsecase {
  public async execute(data: GetCompetitionParams): Promise<Return> {
    const repository = new CompetitionRepository();
    const result = await repository.get(data.competitionId);

    const cliprepository = new ClipRepository();
    const ClipData = await cliprepository.listPerCompetition(
      data.competitionId
    );

    let numberOfCompetitions = 0;
    let numberOfViewsTotal = 0;
    if (ClipData != null) {
      numberOfCompetitions = ClipData.length;
      numberOfViewsTotal = ClipData.reduce((acc: number, clip: ClipEntity) => {
        return acc + clip.views;
      }, 0);
    }

    return {
      ok: true,
      code: 200,
      message: "A Competição foi obtida com sucesso.",
      data: {
        result,
        numberOfCompetitions,
        numberOfViewsTotal,
      },
    };
  }
}
