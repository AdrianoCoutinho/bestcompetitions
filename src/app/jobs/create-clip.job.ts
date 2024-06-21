import { CreateClipUsecase } from "../features/clip/usecases/clip-cretate.usecase";
import "../features/user/database/user.repository";

export default {
  key: "createClip",
  async handle({ data }: { data: any }) {
    const { url, type, idCompetition, idUser } = data;
    const usecase = new CreateClipUsecase();
    const result = await usecase.execute({ url, type, idCompetition, idUser });
    console.log("Clip created successfully", result);
  },
};
