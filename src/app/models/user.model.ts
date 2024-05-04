import { v4 as createUuid } from "uuid";

export enum Typeuser {
  Admin = "A",
  Clipper = "C",
  Influencer = "I",
}

export class User {
  private _id: string;

  constructor(
    public email: string,
    public name: string,
    public phone: string,
    public password: string,
    public typeUser: Typeuser,
    public tiktok: string,
    public instagram: string,
    public youtube: string
  ) {
    this._id = createUuid();
  }

  public static create(
    id: string,
    email: string,
    name: string,
    phone: string,
    password: string,
    typeUser: Typeuser,
    tiktok: string,
    instagram: string,
    youtube: string
  ) {
    const user = new User(
      email,
      name,
      phone,
      password,
      typeUser,
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

      email: this.email,
      name: this.name,
      phone: this.phone,
      password: this.password,
      Typeuser: this.typeUser,
      tiktok: this.tiktok,
      instagram: this.instagram,
      youtube: this.youtube,
    };
  }
}
