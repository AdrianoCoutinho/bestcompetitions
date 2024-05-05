import { v4 as createUuid } from "uuid";

export class Clip {
  private _id: string;

  constructor(public url: string, public views: number) {
    this._id = createUuid();
  }

  public static create(id: string, url: string, views: number) {
    const user = new Clip(url, views);
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
      views: this.views,
    };
  }
}
