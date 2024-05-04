import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { Typeuser } from "../../../models/user.model";

@Entity("user")
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({
    type: "varchar",
    length: 1,
    enum: ["A", "C", "I"],
  })
  type: Typeuser;

  @Column({
    nullable: true,
    name: "tiktok",
  })
  tiktok: string;

  @Column({
    nullable: true,
    name: "instagram",
  })
  instagram: string;

  @Column({
    nullable: true,
    name: "youtube",
  })
  youtube: string;

  @CreateDateColumn({
    name: "dthr_register",
  })
  dthrRegister: Date;
}
