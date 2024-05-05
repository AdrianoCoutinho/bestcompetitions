import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("clip")
export class ClipEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  url: string;

  @Column()
  views: number;

  @CreateDateColumn({
    name: "dthr_register",
  })
  dthrRegister: Date;
}
