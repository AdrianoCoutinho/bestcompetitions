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

  public static mapEntityToModel(entity: RegistrationEntity): Registration {
    const registration = Registration.create(
      entity.id,
      entity.idCompetition,
      entity.idUser
    );

    return registration;
  }
}
