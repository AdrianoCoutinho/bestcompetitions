import { v4 as createUuid } from "uuid";
import { Competition } from "./competition.model";
import { User } from "./user.model";

export class Clip {
  private _id: string;

  constructor(
    public url: string,
    public user: User,
    public competition: Competition,
    public views?: number
  ) {
    this._id = createUuid();
  }

  public static create(
    id: string,
    url: string,
    user: User,
    competition: Competition,
    views: number
  ) {
    const clip = new Clip(url, user, competition, views);
    clip._id = id;
    return clip;
  }

  public get id() {
    return this._id;
  }

  public toJson() {
    return {
      _id: this._id,
      url: this.url,
      idUser: this.user,
      idCompetition: this.competition,
      views: this.views,
    };
  }
}
