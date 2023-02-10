import { MigrationInterface, QueryRunner } from "typeorm";

export class adfdObjectDimensions1676046666901 implements MigrationInterface {
    name = 'adfdObjectDimensions1676046666901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "worldObjects" DROP CONSTRAINT "FK_f900a9ff024afcf999d6ccf907b"`);
        // await queryRunner.query(`CREATE TABLE "worlds" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "width" integer NOT NULL, "length" integer NOT NULL, "creatorId" integer, CONSTRAINT "PK_8b447f7a2b28d3567db893ae7a6" PRIMARY KEY ("id"))`);
        // await queryRunner.query(`ALTER TABLE "worlds" ADD CONSTRAINT "FK_05abc239c4bc70dfa8bd3105d0d" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE "worldObjects" ADD CONSTRAINT "FK_f900a9ff024afcf999d6ccf907b" FOREIGN KEY ("worldId") REFERENCES "worlds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "worldObjects" DROP CONSTRAINT "FK_f900a9ff024afcf999d6ccf907b"`);
        // await queryRunner.query(`ALTER TABLE "worlds" DROP CONSTRAINT "FK_05abc239c4bc70dfa8bd3105d0d"`);
        // await queryRunner.query(`DROP TABLE "worlds"`);
        // await queryRunner.query(`ALTER TABLE "worldObjects" ADD CONSTRAINT "FK_f900a9ff024afcf999d6ccf907b" FOREIGN KEY ("worldId") REFERENCES "world"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
