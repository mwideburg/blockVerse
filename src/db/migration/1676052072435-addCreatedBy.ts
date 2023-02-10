import { MigrationInterface, QueryRunner } from "typeorm";

export class addCreatedBy1676052072435 implements MigrationInterface {
    name = 'addCreatedBy1676052072435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worlds" ADD "createdBy" integer NOT NULL`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worlds" DROP COLUMN "createdBy"`);
    }

}
