import {MigrationInterface, QueryRunner} from "typeorm";

export class isTest1624939879177 implements MigrationInterface {
    name = 'isTest1624939879177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "xennotify"."notifications" ADD "is_test" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "xennotify"."notifications" DROP COLUMN "is_test"`);
    }

}
