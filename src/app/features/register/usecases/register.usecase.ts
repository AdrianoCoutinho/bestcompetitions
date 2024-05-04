import bcrypt from "bcrypt";
import { Typeuser, User } from "../../../models/user.model";
import { Return } from "../../../shared/util/return.contract";
import { UserRepository } from "../../user/database/user.repository";

interface RegisterUserParams {
  email: string;
  name: string;
  phone: string;
  password: string;
  typeUser: Typeuser;
  tiktok: string;
  instagram: string;
  youtube: string;
}

export class RegisterUserUsecase {
  public async execute(data: RegisterUserParams): Promise<Return> {
    const repository = new UserRepository();

    const user = await repository.getByEmail(data.email);

    if (user !== null) {
      return {
        ok: false,
        code: 400,
        message: "Usuário já existe",
      };
    }

    const hashpassword = await bcrypt.hash(
      data.password,
      "$2b$10$BLOX9oUHmeJZJv6/QonGU."
    );

    const userRegister = new User(
      data.email,
      data.name,
      data.phone,
      hashpassword,
      data.typeUser,
      data.tiktok,
      data.instagram,
      data.youtube
    );

    const result = await repository.create(userRegister);

    return {
      ok: true,
      code: 201,
      message: "Usuário criado com sucesso",
      data: result,
    };
  }
}
