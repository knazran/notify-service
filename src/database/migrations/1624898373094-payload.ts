import {MigrationInterface, QueryRunner} from "typeorm";

export class payload1624898373094 implements MigrationInterface {
    name = 'payload1624898373094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "xennotify"."notifications" RENAME COLUMN "url" TO "payload"`);
        await queryRunner.query(`ALTER TABLE "xennotify"."notifications" DROP COLUMN "payload"`);
        await queryRunner.query(`ALTER TABLE "xennotify"."notifications" ADD "payload" json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "xennotify"."notifications" DROP COLUMN "payload"`);
        await queryRunner.query(`ALTER TABLE "xennotify"."notifications" ADD "payload" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "xennotify"."notifications" RENAME COLUMN "payload" TO "url"`);
    }

}
