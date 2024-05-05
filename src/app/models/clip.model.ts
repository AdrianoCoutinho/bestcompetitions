import { v4 as createUuid } from "uuid";

export class Clip {
  private _id: string;

  constructor(
    public url: string,
    public idUser: string,
    public idCompetition: string,
    public views?: number
  ) {
    this._id = createUuid();
  }

  public static create(
    id: string,
    url: string,
    idUser: string,
    idCompetition: string,
    views: number
  ) {
    const user = new Clip(url, idUser, idCompetition, views);
    user._id = id;
    return user;
  }

  public get id() {
    return this._id;
  }

  public toJson() {
    return {
      _id: this._id,
      url: this.url,
      idUser: this.idUser,
      idCompetition: this.idCompetition,
      views: this.views,
    };
  }
}
