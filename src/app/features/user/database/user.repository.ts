import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { User } from "../../../models/user.model";
import { UserEntity } from "../../../shared/database/entities/user.entity";

export class UserRepository {
  private repository = TypeormConnection.connection.getRepository(UserEntity);

  public async getByEmail(
    email: string,
    password?: string
  ): Promise<User | null> {
    const result = await this.repository.findOneBy({
      email,
      password,
    });

    if (!result) {
      return null;
    }

    return UserRepository.mapEntityToModel(result);
  }

  public async get(id: string): Promise<User | null> {
    const result = await this.repository.findOneBy({
      id,
    });

    if (!result) {
      return null;
    }

    return UserRepository.mapEntityToModel(result);
  }

  public async create(user: User) {
    const userEntity = this.repository.create({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    });

    const result = await this.repository.save(userEntity);
    return UserRepository.mapEntityToModel(result);
  }

  public async list() {
    const result = await this.repository.findBy({});

    return result.map((item) => UserRepository.mapEntityToModel(item));
  }

  public async changeUsernameTiktok(id: string, username: string) {
    const user = await this.repository.findOneBy({
      id,
    });

    if (user === null) {
      return {
        ok: false,
        code: 404,
        message: "Usuário não encontrado",
        data: null,
      };
    }
    user.tiktok = username;
    await this.repository.save(user);

    return user.tiktok;
  }

  public async VerifyTiktok(id: string): Promise<string | null> {
    const result = await this.repository.findOneBy({
      id,
    });

    if (!result) {
      return null;
    }

    return result.tiktok;
  }

  public static mapEntityToModel(entity: UserEntity): User {
    return User.create(
      entity.id,
      entity.email,
      entity.name,
      entity.phone,
      entity.password,
      entity.type,
      entity.tiktok,
      entity.instagram,
      entity.youtube
    );
  }
}
