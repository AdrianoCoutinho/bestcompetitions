import { MigrationInterface, QueryRunner } from "typeorm";

export class BdFinal1715445929431 implements MigrationInterface {
    name = 'BdFinal1715445929431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bestcompetitions"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "type" character varying(1) NOT NULL DEFAULT 'C', "tiktok" character varying, "instagram" character varying, "youtube" character varying, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bestcompetitions"."competition" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "views" integer NOT NULL DEFAULT '0', "initialDate" TIMESTAMP NOT NULL, "finalDate" TIMESTAMP NOT NULL, "hashtag" character varying NOT NULL, "winner" character varying, "participants" integer NOT NULL DEFAULT '0', "tiktok" character varying, "instagram" character varying, "youtube" character varying, "indActive" boolean NOT NULL DEFAULT true, "id_user" uuid NOT NULL, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_05207ee7d71c2e2ca971822bed3" UNIQUE ("tiktok"), CONSTRAINT "UQ_65cfc325f97cd61f500714d856d" UNIQUE ("instagram"), CONSTRAINT "UQ_3eefe97032158b80bdeadf97026" UNIQUE ("youtube"), CONSTRAINT "PK_a52a6248db574777b226e9445bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bestcompetitions"."clip" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "views" integer NOT NULL DEFAULT '0', "videoDate" TIMESTAMP NOT NULL, "diggCount" integer NOT NULL, "username" character varying NOT NULL, "shareCount" integer NOT NULL, "avatarUrl" character varying NOT NULL, "videoUrl" character varying NOT NULL, "nickname" character varying NOT NULL, "id_user" uuid NOT NULL, "id_competition" uuid NOT NULL, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), "last_update" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fa9732d754b4451431e894b0bb0" UNIQUE ("url"), CONSTRAINT "PK_f0685dac8d4dd056d7255670b75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bestcompetitions"."registration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "id_user" uuid NOT NULL, "id_competition" uuid NOT NULL, "dthr_register" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cb23dc9d28df8801b15e9e2b8d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."competition" ADD CONSTRAINT "FK_bed24c6fdd91d9d2674ae0c32f8" FOREIGN KEY ("id_user") REFERENCES "bestcompetitions"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."clip" ADD CONSTRAINT "FK_020d13d6e034298905a29e24f20" FOREIGN KEY ("id_user") REFERENCES "bestcompetitions"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."clip" ADD CONSTRAINT "FK_d548fd3c910f3002d5816807d09" FOREIGN KEY ("id_competition") REFERENCES "bestcompetitions"."competition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."registration" ADD CONSTRAINT "FK_9c21e3c3a8966ab3d5baeacf330" FOREIGN KEY ("id_user") REFERENCES "bestcompetitions"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."registration" ADD CONSTRAINT "FK_b3ec4d2552386fa2a4f2d00c9c0" FOREIGN KEY ("id_competition") REFERENCES "bestcompetitions"."competition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."registration" DROP CONSTRAINT "FK_b3ec4d2552386fa2a4f2d00c9c0"`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."registration" DROP CONSTRAINT "FK_9c21e3c3a8966ab3d5baeacf330"`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."clip" DROP CONSTRAINT "FK_d548fd3c910f3002d5816807d09"`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."clip" DROP CONSTRAINT "FK_020d13d6e034298905a29e24f20"`);
        await queryRunner.query(`ALTER TABLE "bestcompetitions"."competition" DROP CONSTRAINT "FK_bed24c6fdd91d9d2674ae0c32f8"`);
        await queryRunner.query(`DROP TABLE "bestcompetitions"."registration"`);
        await queryRunner.query(`DROP TABLE "bestcompetitions"."clip"`);
        await queryRunner.query(`DROP TABLE "bestcompetitions"."competition"`);
        await queryRunner.query(`DROP TABLE "bestcompetitions"."user"`);
    }

}
