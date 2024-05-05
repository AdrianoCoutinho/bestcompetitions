import { MigrationInterface, QueryRunner } from "typeorm";

export class BdFinal1714926106790 implements MigrationInterface {
    name = 'BdFinal1714926106790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bestcompetitions"."user" ("id" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "type" character varying(1) NOT NULL DEFAULT 'C', "tiktok" character varying, "instagram" character varying, "youtube" character varying, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bestcompetitions"."clip" ("id" character varying NOT NULL, "url" character varying NOT NULL, "views" integer NOT NULL DEFAULT '0', "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fa9732d754b4451431e894b0bb0" UNIQUE ("url"), CONSTRAINT "PK_f0685dac8d4dd056d7255670b75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bestcompetitions"."competition" ("id" character varying NOT NULL, "name" character varying NOT NULL, "initialDate" TIMESTAMP NOT NULL, "finalDate" TIMESTAMP NOT NULL, "hashtag" character varying NOT NULL, "winner" character varying, "participants" integer NOT NULL DEFAULT '0', "tiktok" character varying, "instagram" character varying, "youtube" character varying, "indActive" boolean NOT NULL DEFAULT true, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" character varying, CONSTRAINT "UQ_05207ee7d71c2e2ca971822bed3" UNIQUE ("tiktok"), CONSTRAINT "UQ_65cfc325f97cd61f500714d856d" UNIQUE ("instagram"), CONSTRAINT "UQ_3eefe97032158b80bdeadf97026" UNIQUE ("youtube"), CONSTRAINT "PK_a52a6248db574777b226e9445bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bestcompetitions"."registration" ("id" character varying NOT NULL, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), "idClipId" character varying, "idUserId" character varying, "idCompetitionId" character varying, CONSTRAINT "PK_cb23dc9d28df8801b15e9e2b8d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."competition" ADD CONSTRAINT "FK_4c9b84a515e51b92c6201a7fac7" FOREIGN KEY ("ownerId") REFERENCES "bestcompetitions"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."registration" ADD CONSTRAINT "FK_5ff64d342d93e7f044d64f68841" FOREIGN KEY ("idClipId") REFERENCES "bestcompetitions"."clip"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."registration" ADD CONSTRAINT "FK_d6fba9afa7e5214cb439fc7247e" FOREIGN KEY ("idUserId") REFERENCES "bestcompetitions"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."registration" ADD CONSTRAINT "FK_4e0c77abf2420420de7409b91e7" FOREIGN KEY ("idCompetitionId") REFERENCES "bestcompetitions"."competition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."registration" DROP CONSTRAINT "FK_4e0c77abf2420420de7409b91e7"`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."registration" DROP CONSTRAINT "FK_d6fba9afa7e5214cb439fc7247e"`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."registration" DROP CONSTRAINT "FK_5ff64d342d93e7f044d64f68841"`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."competition" DROP CONSTRAINT "FK_4c9b84a515e51b92c6201a7fac7"`);
        await queryRunner.query(`DROP TABLE "bestcompetitions"."registration"`);
        await queryRunner.query(`DROP TABLE "bestcompetitions"."competition"`);
        await queryRunner.query(`DROP TABLE "bestcompetitions"."clip"`);
        await queryRunner.query(`DROP TABLE "bestcompetitions"."user"`);
    }

}
