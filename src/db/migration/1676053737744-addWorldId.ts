import { MigrationInterface, QueryRunner } from "typeorm";

export class addWorldId1676053737744 implements MigrationInterface {
    name = 'addWorldId1676053737744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        //  await queryRunner.query(`TRUNCATE "worlds" CASCADE`);
        // await queryRunner.query(`TRUNCATE "worldObjects"`);
        // await queryRunner.query(`TRUNCATE "user" CASCADE`);
        await queryRunner.query(`ALTER TABLE "worldObjects" DROP CONSTRAINT "FK_f900a9ff024afcf999d6ccf907b"`);
        await queryRunner.query(`ALTER TABLE "worldObjects" ALTER COLUMN "worldId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "worldObjects" ADD CONSTRAINT "FK_f900a9ff024afcf999d6ccf907b" FOREIGN KEY ("worldId") REFERENCES "worlds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "worldObjects" DROP CONSTRAINT "FK_f900a9ff024afcf999d6ccf907b"`);
        await queryRunner.query(`ALTER TABLE "worldObjects" ALTER COLUMN "worldId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "worldObjects" ADD CONSTRAINT "FK_f900a9ff024afcf999d6ccf907b" FOREIGN KEY ("worldId") REFERENCES "worlds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
