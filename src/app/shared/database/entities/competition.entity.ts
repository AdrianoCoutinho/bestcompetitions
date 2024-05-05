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
  initialDate: Date;

  @ManyToOne(() => UserEntity)
  owner: UserEntity;

  @Column()
  finalDate: Date;

  @Column()
  hashtag: string;

  @Column()
  winner: string;

  @Column()
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

  @CreateDateColumn({
    name: "dthr_register",
  })
  dthrRegister: Date;
}
