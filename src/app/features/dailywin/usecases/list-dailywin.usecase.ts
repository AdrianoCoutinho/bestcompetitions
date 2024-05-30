import { Return } from "../../../shared/util/return.contract";
import { DailyWinRepository } from "../database/dailywin.repository";

export class ListDailyWinUsecase {
  public async execute(): Promise<Return> {
    const dailywinrepository = new DailyWinRepository();
    const listdailywin = await dailywinrepository.list();

    if (listdailywin === null) {
      return {
        ok: false,
        code: 400,
        message: "Não há videos.",
        data: listdailywin,
      };
    }

    return {
      ok: true,
      code: 200,
      message: "DailiesWin listadas com sucesso.",
      data: listdailywin,
    };
  }
}
