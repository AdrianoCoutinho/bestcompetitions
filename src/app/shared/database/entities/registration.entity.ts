import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { CompetitionEntity } from "./competition.entity";
import { UserEntity } from "./user.entity";

@Entity("registration")
export class RegistrationEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => UserEntity)
  idUser: string;

  @ManyToOne(() => CompetitionEntity)
  idCompetition: string;

  @CreateDateColumn({
    name: "dthr_register",
  })
  dthrRegister: Date;
}
