import { v4 as createUuid } from "uuid";

export class Registration {
  private _id: string;

  constructor(public idUser: string, public idCompetition: string) {
    this._id = createUuid();
  }

  public static create(id: string, idUser: string, idCompetition: string) {
    const registration = new Registration(idUser, idCompetition);
    registration._id = id;
    return registration;
  }

  public get id() {
    return this._id;
  }

  public toJson() {
    return {
      _id: this._id,
      idUser: this.idUser,
      idCompetition: this.idCompetition,
    };
  }
}
