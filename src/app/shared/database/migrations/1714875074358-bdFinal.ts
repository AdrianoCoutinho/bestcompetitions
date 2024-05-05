import { MigrationInterface, QueryRunner } from "typeorm";

export class BdFinal1714875074358 implements MigrationInterface {
    name = 'BdFinal1714875074358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bestcompetitions"."user" ("id" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "type" character varying(1) NOT NULL DEFAULT 'C', "tiktok" character varying, "instagram" character varying, "youtube" character varying, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bestcompetitions"."competition" ("id" character varying NOT NULL, "initialDate" TIMESTAMP NOT NULL, "finalDate" TIMESTAMP NOT NULL, "hashtag" character varying NOT NULL, "winner" character varying NOT NULL, "participants" integer NOT NULL, "tiktok" character varying, "instagram" character varying, "youtube" character varying, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" character varying, CONSTRAINT "UQ_05207ee7d71c2e2ca971822bed3" UNIQUE ("tiktok"), CONSTRAINT "UQ_65cfc325f97cd61f500714d856d" UNIQUE ("instagram"), CONSTRAINT "UQ_3eefe97032158b80bdeadf97026" UNIQUE ("youtube"), CONSTRAINT "PK_a52a6248db574777b226e9445bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bestcompetitions"."clip" ("id" character varying NOT NULL, "url" character varying NOT NULL, "views" integer NOT NULL, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fa9732d754b4451431e894b0bb0" UNIQUE ("url"), CONSTRAINT "PK_f0685dac8d4dd056d7255670b75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bestcompetitions"."Registration" ("id" character varying NOT NULL, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), "idClipId" character varying, "idUserId" character varying, "idCompetitionId" character varying, CONSTRAINT "PK_e46e36c4264acb4825fea4f2536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."competition" ADD CONSTRAINT "FK_4c9b84a515e51b92c6201a7fac7" FOREIGN KEY ("ownerId") REFERENCES "bestcompetitions"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."Registration" ADD CONSTRAINT "FK_bf9a050e946c23117c122a7d7a9" FOREIGN KEY ("idClipId") REFERENCES "bestcompetitions"."clip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."Registration" ADD CONSTRAINT "FK_32bb905ccceb9ccbbef19d18319" FOREIGN KEY ("idUserId") REFERENCES "bestcompetitions"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."Registration" ADD CONSTRAINT "FK_8ca5e2e91c51d095438dce21c1d" FOREIGN KEY ("idCompetitionId") REFERENCES "bestcompetitions"."competition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."Registration" DROP CONSTRAINT "FK_8ca5e2e91c51d095438dce21c1d"`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."Registration" DROP CONSTRAINT "FK_32bb905ccceb9ccbbef19d18319"`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."Registration" DROP CONSTRAINT "FK_bf9a050e946c23117c122a7d7a9"`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."competition" DROP CONSTRAINT "FK_4c9b84a515e51b92c6201a7fac7"`);
        await queryRunner.query(`DROP TABLE "bestcompetitions"."Registration"`);
        await queryRunner.query(`DROP TABLE "bestcompetitions"."clip"`);
        await queryRunner.query(`DROP TABLE "bestcompetitions"."competition"`);
        await queryRunner.query(`DROP TABLE "bestcompetitions"."user"`);
    }

}
