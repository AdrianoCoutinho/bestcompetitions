import { CreateClipUsecase } from "../features/clip/usecases/clip-cretate.usecase";
import "../features/user/database/user.repository";

export default {
  key: "createClip",
  async handle({ data }: { data: any }) {
    const { url, type, idCompetition, idUser } = data;
    const usecase = new CreateClipUsecase();
    const result = await usecase.execute({ url, type, idCompetition, idUser });
    const message = {
      ok: result.ok,
      code: result.code,
      message: result.message,
      data: result.data,
    };
    console.log(message);
  },
};
