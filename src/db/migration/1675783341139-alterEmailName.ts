import { MigrationInterface, QueryRunner } from "typeorm";

export class alterEmailName1675783341139 implements MigrationInterface {
    name = 'alterEmailName1675783341139'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "email" TO "userName"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" TO "UQ_da5934070b5f2726ebfd3122c80"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" TO "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "userName" TO "email"`);
    }

}
