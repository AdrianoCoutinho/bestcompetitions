import { v4 as createUuid } from "uuid";
import { ClipEntity } from "../shared/database/entities/clip.entity";
import { CompetitionEntity } from "../shared/database/entities/competition.entity";
import { UserEntity } from "../shared/database/entities/user.entity";

export class Registration {
  private _id: string;

  constructor(
    public idClip: ClipEntity,
    public idUser: UserEntity,
    public idCompetition: CompetitionEntity
  ) {
    this._id = createUuid();
  }

  public static create(
    id: string,
    idClip: ClipEntity,
    idUser: UserEntity,
    idCompetition: CompetitionEntity
  ) {
    const user = new Registration(idClip, idUser, idCompetition);
    user._id = id;
    return user;
  }

  public get id() {
    return this._id;
  }

  public toJson() {
    return {
      _id: this._id,
      idClip: this.idClip,
      idUser: this.idUser,
      idCompetition: this.idCompetition,
    };
  }
}
