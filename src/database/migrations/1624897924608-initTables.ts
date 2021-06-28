import {MigrationInterface, QueryRunner} from "typeorm";

export class initTables1624897924608 implements MigrationInterface {
    name = 'initTables1624897924608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "xennotify"."notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "event" character varying NOT NULL, "status" "xennotify"."notifications_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "endpointId" uuid, CONSTRAINT "PK_a2ca2ec590f605cd140d9562f49" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "xennotify"."endpoints" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "merchantID" integer NOT NULL, "url" character varying NOT NULL, "event" character varying NOT NULL, "secret" character varying NOT NULL, "status" "xennotify"."endpoints_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_245e9e31a78b4f5cfbe0b892948" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "xennotify"."notifications" ADD CONSTRAINT "FK_506a9fb713b6e93ea8b624efbc4" FOREIGN KEY ("endpointId") REFERENCES "xennotify"."endpoints"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "xennotify"."notifications" DROP CONSTRAINT "FK_506a9fb713b6e93ea8b624efbc4"`);
        await queryRunner.query(`DROP TABLE "xennotify"."endpoints"`);
        await queryRunner.query(`DROP TABLE "xennotify"."notifications"`);
    }

}
