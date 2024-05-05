import { MigrationInterface, QueryRunner } from "typeorm";

export class BdUser1714866017586 implements MigrationInterface {
    name = 'BdUser1714866017586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bestcompetitions"."user" ("id" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "type" character varying(1) NOT NULL DEFAULT 'C', "tiktok" character varying, "instagram" character varying, "youtube" character varying, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bestcompetitions"."user"`);
    }

}
