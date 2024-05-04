import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Typeuser, User } from "../../../models/user.model";
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
      email: user.email,
      name: user.name,
      phone: user.phone,
      password: user.password,
      type: user.typeUser,
      tiktok: user.tiktok,
      instagram: user.instagram,
      youtube: user.youtube,
    });

    const result = await this.repository.save(userEntity);
    return UserRepository.mapEntityToModel(result);
  }

  public async list(type?: Typeuser) {
    const result = await this.repository.findBy({
      type,
    });

    return result.map((item) => UserRepository.mapEntityToModel(item));
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
