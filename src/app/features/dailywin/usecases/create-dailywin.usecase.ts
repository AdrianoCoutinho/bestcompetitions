import { DailyWin } from "../../../models/dailyWin.model";
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
    const listdailywin = await cliprepository.listDailyWin(idCompetition, date);

    if (listdailywin === null) {
      return {
        ok: false,
        code: 400,
        message: "Não há videos.",
        data: date,
      };
    }

    const result = listdailywin.reduce((acc: any, video: any) => {
      const profilePicture = video.user.photo;
      const user = video.user.email;
      const views = video.views;
      const email = video.user.email;

      if (!acc[email]) {
        acc[email] = { profilePicture, user, views: 0, date, email };
      }
      acc[email].views += views;

      return acc;
    }, {});

    const resultArray = Object.values(result);

    const videoDate = new Date(date);
    const dailywin = new DailyWin(videoDate, resultArray, competition);
    const repository = new DailyWinRepository();
    await repository.create(dailywin);

    return {
      ok: true,
      code: 201,
      message: "Os 10 primeiros clipadores foram listados com sucesso.",
      data: resultArray,
    };
  }
}
