import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CompetitionEntity } from "./competition.entity";
import { UserEntity } from "./user.entity";

@Entity("clip")
export class ClipEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true,
  })
  url: string;

  @Column({ default: 0 })
  views: number;

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

  @Column({
    name: "id_competition",
  })
  idCompetition: string;

  @ManyToOne(() => CompetitionEntity, {
    cascade: true,
  })
  @JoinColumn({
    name: "id_competition",
  })
  competition: CompetitionEntity;

  @CreateDateColumn({
    name: "dthr_register",
  })
  dthrRegister: Date;
}
