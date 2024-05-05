import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { ClipEntity } from "./clip.entity";
import { CompetitionEntity } from "./competition.entity";
import { UserEntity } from "./user.entity";

@Entity("Registration")
export class RegistrationEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => ClipEntity)
  idClip: ClipEntity;

  @ManyToOne(() => UserEntity)
  idUser: UserEntity;

  @ManyToOne(() => CompetitionEntity)
  idCompetition: CompetitionEntity;

  @CreateDateColumn({
    name: "dthr_register",
  })
  dthrRegister: Date;
}
