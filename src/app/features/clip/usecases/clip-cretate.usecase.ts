import { Clip } from "../../../models/clip.model";
import { Return } from "../../../shared/util/return.contract";
import { ClipRepository } from "../database/clip.database";

interface CreateClipParams {
  url: string;
}

export class CreateClipUsecase {
  public async execute(data: CreateClipParams): Promise<Return> {
    const clip = new Clip(data.url);

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
