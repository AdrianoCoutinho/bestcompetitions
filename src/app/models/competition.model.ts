import { v4 as createUuid } from "uuid";
import { User } from "./user.model";

export class Competition {
  private _id: string;

  constructor(
    public name: string,
    public initialDate: Date,
    public finalDate: Date,
    public hashtag: string,
    public user: User,
    public winner?: string,
    public participants?: number,
    public tiktok?: string,
    public instagram?: string,
    public youtube?: string,
    public indActive?: boolean
  ) {
    this._id = createUuid();
  }

  public static create(
    id: string,
    name: string,
    initialDate: Date,
    finalDate: Date,
    hashtag: string,
    user: User,
    winner: string,
    participants: number,
    tiktok: string,
    instagram: string,
    youtube: string,
    indActive: boolean
  ) {
    const competition = new Competition(
      name,
      initialDate,
      finalDate,
      hashtag,
      user,
      winner,
      participants,
      tiktok,
      instagram,
      youtube,
      indActive
    );
    competition._id = id;
    return competition;
  }

  public get id() {
    return this._id;
  }

  public toJson() {
    return {
      _id: this._id,
      name: this.name,
      initialDate: this.initialDate,
      finalDate: this.finalDate,
      hashtag: this.hashtag,
      user: this.user,
      winner: this.winner,
      participants: this.participants,
      tiktok: this.tiktok,
      instagram: this.instagram,
      youtube: this.youtube,
      indActive: this.indActive,
    };
  }
}
