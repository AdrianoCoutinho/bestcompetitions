import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity("competition")
export class CompetitionEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  views: number;

  @Column()
  initialDate: Date;

  @Column()
  finalDate: Date;

  @Column()
  hashtag: string;

  @Column({
    nullable: true,
  })
  winner: string;

  @Column({ default: 0 })
  participants: number;

  @Column({
    nullable: true,
    unique: true,
  })
  tiktok: string;

  @Column({
    nullable: true,
    unique: true,
  })
  instagram: string;

  @Column({
    nullable: true,
    unique: true,
  })
  youtube: string;

  @Column({ default: true })
  indActive: boolean;

  @Column({
    name: "id_user",
  })
  idUser: string;

  @ManyToOne(() => UserEntity, {
    cascade: true,
  })
  @JoinColumn({
    name: "id_user",
  })
  user: UserEntity;

  @CreateDateColumn({
    name: "dthr_register",
  })
  dthrRegister: Date;
}
