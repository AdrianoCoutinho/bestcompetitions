import { v4 as createUuid } from "uuid";
import { PlatformType, StatusType } from "../shared/enum";
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
    public description: string,
    public diggCount: number,
    public shareCount: number,
    public videoUrl: string,
    public nickname: string,
    public type: PlatformType,
    public status: StatusType,
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
    description: string,
    diggCount: number,
    shareCount: number,
    videoUrl: string,
    nickname: string,
    type: PlatformType,
    status: StatusType,
    views: number
  ) {
    const clip = new Clip(
      url,
      user,
      competition,
      videoDate,
      username,
      description,
      diggCount,
      shareCount,
      videoUrl,
      nickname,
      type,
      status,
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
      idUser: this.user.id,
      idCompetition: this.competition.id,
      videoDate: this.videoDate,
      username: this.username,
      description: this.description,
      shareCount: this.shareCount,
      videoUrl: this.videoUrl,
      nickname: this.nickname,
      type: this.type,
      status: this.status,
      views: this.views,
    };
  }
}
