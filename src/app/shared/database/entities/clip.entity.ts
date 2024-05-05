import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { CompetitionEntity } from "./competition.entity";
import { UserEntity } from "./user.entity";

@Entity("clip")
export class ClipEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  url: string;

  @Column({
    default: 0,
  })
  views: number;

  @ManyToOne(() => UserEntity, {
    nullable: false,
  })
  idUser: string;

  @ManyToOne(() => CompetitionEntity, {
    nullable: false,
  })
  idCompetition: string;

  @CreateDateColumn({
    name: "dthr_register",
  })
  dthrRegister: Date;
}
