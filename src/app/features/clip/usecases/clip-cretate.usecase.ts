import { Clip } from "../../../models/clip.model";
import { Return } from "../../../shared/util/return.contract";
import { ClipRepository } from "../database/clip.database";

interface CreateClipParams {
  url: string;
  idUser: string;
  idCompetition: string;
}

export class CreateClipUsecase {
  public async execute(data: CreateClipParams): Promise<Return> {
    const clip = new Clip(data.url, data.idUser, data.idCompetition);

    const repository = new ClipRepository();
    await repository.create(clip);

    return {
      ok: true,
      code: 201,
      message: "O clip foi criado com sucesso.",
      data: clip,
    };
  }
}
