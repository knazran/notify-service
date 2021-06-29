import {MigrationInterface, QueryRunner} from "typeorm";
import config from '~/config'

const appSchema = config.DB.MAIN_SCHEMA

export class initTables1624938489674 implements MigrationInterface {
    name = 'initTables1624938489674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "${appSchema}"."notifications_status_enum" AS ENUM('pending', 'success', 'failed')`);
        await queryRunner.query(`CREATE TABLE "${appSchema}"."notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payload" json NOT NULL, "event" character varying NOT NULL, "status" "${appSchema}"."notifications_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "endpointId" uuid, CONSTRAINT "PK_ac29657e49dc39d8d27dd2e456d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "${appSchema}"."endpoints_status_enum" AS ENUM('active', 'disabled')`);
        await queryRunner.query(`CREATE TABLE "${appSchema}"."endpoints" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "merchantID" integer NOT NULL, "url" character varying NOT NULL, "event" character varying NOT NULL, "secret" character varying NOT NULL, "status" "${appSchema}"."endpoints_status_enum" NOT NULL DEFAULT 'active', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "PK_ab64cdbce4ca8321349ae9fb005" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "${appSchema}"."notifications" ADD CONSTRAINT "FK_56ccb4dd7a97cd1988734259473" FOREIGN KEY ("endpointId") REFERENCES "${appSchema}"."endpoints"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "${appSchema}"."notifications" DROP CONSTRAINT "FK_56ccb4dd7a97cd1988734259473"`);
        await queryRunner.query(`DROP TABLE "${appSchema}"."endpoints"`);
        await queryRunner.query(`DROP TYPE "${appSchema}"."endpoints_status_enum"`);
        await queryRunner.query(`DROP TABLE "${appSchema}"."notifications"`);
        await queryRunner.query(`DROP TYPE "${appSchema}"."notifications_status_enum"`);
    }

}
