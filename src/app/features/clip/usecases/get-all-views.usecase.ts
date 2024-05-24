import axios from "axios";
import { apifyEnv } from "../../../envs/apify.env";
import { getView } from "../../../shared/apify";
import { Return } from "../../../shared/util/return.contract";
import { CompetitionRepository } from "../../competition/database/competition.repository";
import { ClipRepository } from "../database/clip.repository";

axios.defaults.baseURL = apifyEnv.secret;

interface GetAllClipsParams {
  idCompetition: string;
}

export class GetAllViewsUsecase {
  public async execute(data: GetAllClipsParams): Promise<Return> {
    const competitionRepository = new CompetitionRepository();
    const competition = await competitionRepository.get(data.idCompetition);

    if (!competition) {
      return {
        ok: false,
        code: 404,
        message: "Competição não encontrada.",
      };
    }

    const cliprepository = new ClipRepository();
    const clips = await cliprepository.listPerCompetition(data.idCompetition);

    if (!clips) {
      return {
        ok: false,
        code: 400,
        message: "Não há clipes nesta competição.",
      };
    }

    const urls = clips.map((item) => {
      return {
        url: item.url,
        id: item.id,
      };
    });

    const results = [];

    for (let i = 0; i < urls.length; i++) {
      const { url, id } = urls[i];
      try {
        const result = await getView(url);
        console.log(result.data);
        results.push(...result.data);
        await cliprepository.UpdateView(id, {
          playCount: results[i].playCount,
          diggCount: results[i].diggCount,
          shareCount: results[i].shareCount,
        });
      } catch (error) {
        console.error(`Erro na consulta ${i + 1}:`, error);
      }
    }

    return {
      ok: true,
      code: 200,
      message: "Os clips foram analisados com sucesso.",
      data: results,
    };
  }
}
