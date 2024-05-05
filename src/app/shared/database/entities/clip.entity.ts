import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

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

  @CreateDateColumn({
    name: "dthr_register",
  })
  dthrRegister: Date;
}
