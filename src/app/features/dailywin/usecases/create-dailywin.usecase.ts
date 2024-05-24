import { DayliWin } from "../../../models/dailyWin.model";
import { Return } from "../../../shared/util/return.contract";
import { ClipRepository } from "../../clip/database/clip.repository";
import { CompetitionRepository } from "../../competition/database/competition.repository";
import { DailyWinRepository } from "../database/dailywin.repository";

export class CreateDailyWinUsecase {
  public async execute(idCompetition: string, date: string): Promise<Return> {
    const competitionRepository = new CompetitionRepository();
    const competition = await competitionRepository.get(idCompetition);

    if (!competition) {
      return {
        ok: false,
        code: 404,
        message: "Competição não encontrada.",
      };
    }

    const cliprepository = new ClipRepository();
    const listdayliwin = await cliprepository.listDailyWin(idCompetition, date);

    if (listdayliwin === null) {
      return {
        ok: false,
        code: 400,
        message: "Não há videos.",
        data: listdayliwin,
      };
    }
    const videoDate = new Date(date);
    videoDate.setHours(+33, 0, 0, 0);
    const dayliwin = new DayliWin(
      new Date(videoDate),
      listdayliwin,
      competition
    );
    const repository = new DailyWinRepository();
    await repository.create(dayliwin);

    return {
      ok: true,
      code: 201,
      message: "Os 10 primeiros clipadores foram listados com sucesso.",
      data: listdayliwin,
    };
  }
}
