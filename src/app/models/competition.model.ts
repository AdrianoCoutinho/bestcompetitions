import { v4 as createUuid } from "uuid";

export class Competition {
  private _id: string;

  constructor(
    public name: string,
    public initialDate: Date,
    public finalDate: Date,
    public hashtag: string,
    public winner: string,
    public participants: number,
    public tiktok: string,
    public instagram: string,
    public youtube: string
  ) {
    this._id = createUuid();
  }

  public static create(
    id: string,
    name: string,
    initialDate: Date,
    finalDate: Date,
    hashtag: string,
    winner: string,
    participants: number,
    tiktok: string,
    instagram: string,
    youtube: string
  ) {
    const user = new Competition(
      name,
      initialDate,
      finalDate,
      hashtag,
      winner,
      participants,
      tiktok,
      instagram,
      youtube
    );
    user._id = id;
    return user;
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
      winner: this.winner,
      participants: this.participants,
      tiktok: this.tiktok,
      instagram: this.instagram,
      youtube: this.youtube,
    };
  }
}
