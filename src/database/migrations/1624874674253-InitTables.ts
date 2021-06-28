import {MigrationInterface, QueryRunner} from "typeorm";

export class InitTables1624874674253 implements MigrationInterface {
    name = 'InitTables1624874674253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "xennotify"."merchants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_d325b6e54b4f14bb6e16450ab27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "xennotify"."notifications_status_enum" AS ENUM('pending', 'success', 'failed')`);
        await queryRunner.query(`CREATE TABLE "xennotify"."notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "event" character varying NOT NULL, "status" "xennotify"."notifications_status_enum" NOT NULL DEFAULT 'pending', "is_deleted" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL, "endpointId" uuid, CONSTRAINT "PK_a2ca2ec590f605cd140d9562f49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "xennotify"."endpoints_status_enum" AS ENUM('active', 'disabled')`);
        await queryRunner.query(`CREATE TABLE "xennotify"."endpoints" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "event" character varying NOT NULL, "status" "xennotify"."endpoints_status_enum" NOT NULL DEFAULT 'active', "is_deleted" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "deleted_at" TIMESTAMP WITH TIME ZONE NOT NULL, "merchantId" uuid, CONSTRAINT "PK_245e9e31a78b4f5cfbe0b892948" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "xennotify"."notifications" ADD CONSTRAINT "FK_506a9fb713b6e93ea8b624efbc4" FOREIGN KEY ("endpointId") REFERENCES "xennotify"."endpoints"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "xennotify"."endpoints" ADD CONSTRAINT "FK_46b9bbf6bd1c40eff1b1e48c477" FOREIGN KEY ("merchantId") REFERENCES "xennotify"."merchants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "xennotify"."endpoints" DROP CONSTRAINT "FK_46b9bbf6bd1c40eff1b1e48c477"`);
        await queryRunner.query(`ALTER TABLE "xennotify"."notifications" DROP CONSTRAINT "FK_506a9fb713b6e93ea8b624efbc4"`);
        await queryRunner.query(`DROP TABLE "xennotify"."endpoints"`);
        await queryRunner.query(`DROP TYPE "xennotify"."endpoints_status_enum"`);
        await queryRunner.query(`DROP TABLE "xennotify"."notifications"`);
        await queryRunner.query(`DROP TYPE "xennotify"."notifications_status_enum"`);
        await queryRunner.query(`DROP TABLE "xennotify"."merchants"`);
    }

}
