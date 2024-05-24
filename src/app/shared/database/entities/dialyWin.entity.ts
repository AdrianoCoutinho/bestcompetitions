import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CompetitionEntity } from "./competition.entity";

@Entity("dailywin")
export class DailyWinEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  winDate: Date;

  @Column("json")
  data: object;

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

  @UpdateDateColumn({
    name: "last_update",
  })
  lastUpdate: Date;
}
