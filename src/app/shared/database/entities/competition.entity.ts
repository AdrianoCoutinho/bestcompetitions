import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("competition")
export class CompetitionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  views: number;

  @Column()
  initialDate: Date;

  @ManyToOne(() => UserEntity, {
    nullable: false,
  })
  idUser: string;

  @Column()
  finalDate: Date;

  @Column()
  hashtag: string;

  @Column({
    nullable: true,
  })
  winner: string;

  @Column({
    default: 0,
  })
  participants: number;

  @Column({
    nullable: true,
    name: "tiktok",
    unique: true,
  })
  tiktok: string;

  @Column({
    nullable: true,
    name: "instagram",
    unique: true,
  })
  instagram: string;

  @Column({
    nullable: true,
    name: "youtube",
    unique: true,
  })
  youtube: string;

  @Column({
    default: true,
  })
  indActive: boolean;

  @CreateDateColumn({
    name: "dthr_register",
  })
  dthrRegister: Date;
}
