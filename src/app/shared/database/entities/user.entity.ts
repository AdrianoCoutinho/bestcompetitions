import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Typeuser } from "../../../models/user.model";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
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
    default: "C",
  })
  type: Typeuser;

  @Column({
    nullable: true,
  })
  tiktok: string;

  @Column({
    nullable: true,
  })
  instagram: string;

  @Column({
    nullable: true,
  })
  youtube: string;

  @CreateDateColumn({
    name: "dthr_register",
  })
  dthrRegister: Date;
}
