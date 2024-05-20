import { TypeormConnection } from "../../../../main/database/typeorm.connection";
import { Registration } from "../../../models/registrations.model";
import { RegistrationEntity } from "../../../shared/database/entities/registration.entity";

export class RegistrationRepository {
  private repository =
    TypeormConnection.connection.getRepository(RegistrationEntity);

  public async create(registration: Registration) {
    const registationEntity = this.repository.create({
      id: registration.id,
      idUser: registration.idUser,
      idCompetition: registration.idCompetition,
    });

    await this.repository.save(registationEntity);
  }

  public async listByCompetitionId(id: string) {
    if (!id) {
      return null;
    }

    const result = await this.repository.find({
      where: {
        idCompetition: id,
      },
      relations: ["competition"],
    });

    if (result === null) {
      return null;
    }

    return result;
  }

  public async getByUserId(id: string) {
    if (!id) {
      return null;
    }

    const result = await this.repository.findOne({
      where: {
        idUser: id,
      },
      relations: ["user"],
    });

    if (result === null) {
      return null;
    }

    return RegistrationRepository.mapEntityToModel(result);
  }

  public static mapEntityToModel(entity: RegistrationEntity): Registration {
    const registration = Registration.create(
      entity.id,
      entity.idCompetition,
      entity.idUser
    );

    return registration;
  }
}
