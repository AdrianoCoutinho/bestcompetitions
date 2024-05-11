import { v4 as createUuid } from "uuid";
import { Competition } from "./competition.model";
import { User } from "./user.model";

export class Clip {
  private _id: string;

  constructor(
    public url: string,
    public user: User,
    public competition: Competition,
    public videoDate: Date,
    public username: string,
    public diggCount: number,
    public sharecount: number,
    public avatarUrl: string,
    public videoUrl: string,
    public nickname: string,

    public views?: number
  ) {
    this._id = createUuid();
  }

  public static create(
    id: string,
    url: string,
    user: User,
    competition: Competition,
    videoDate: Date,
    username: string,
    diggCount: number,
    shareCount: number,
    avatarUrl: string,
    videoUrl: string,
    nickname: string,

    views: number
  ) {
    const clip = new Clip(
      url,
      user,
      competition,
      videoDate,
      username,
      shareCount,
      diggCount,
      avatarUrl,
      videoUrl,
      nickname,
      views
    );
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
      videoDate: this.videoDate,
      username: this.username,
      sharecount: this.sharecount,
      avatarUrl: this.avatarUrl,
      videoUrl: this.videoUrl,
      nickname: this.nickname,
      views: this.views,
    };
  }
}
