import { v4 as createUuid } from "uuid";
import { Competition } from "./competition.model";

export class DayliWin {
  private _id: string;

  constructor(
    public winDate: Date,
    public data: object,
    public competition: Competition
  ) {
    this._id = createUuid();
  }

  public static create(
    id: string,
    winDate: Date,
    data: object,
    competition: Competition
  ) {
    const clip = new DayliWin(winDate, data, competition);
    clip._id = id;
    return clip;
  }

  public get id() {
    return this._id;
  }

  public toJson() {
    return {
      _id: this._id,
      data: this.data,
      winDate: this.winDate,
      idCompetition: this.competition,
    };
  }
}
