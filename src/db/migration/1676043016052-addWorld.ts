import { MigrationInterface, QueryRunner } from "typeorm";

export class addWorld1676043016052 implements MigrationInterface {
    name = 'addWorld1676043016052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`CREATE TABLE "worldObjects" ("id" SERIAL NOT NULL, "x" integer NOT NULL, "y" integer NOT NULL, "z" integer NOT NULL, "worldId" integer, CONSTRAINT "PK_a96599f44fa205fcc9e8f998974" PRIMARY KEY ("id"))`);
        // await queryRunner.query(`ALTER TABLE "worldObjects" ADD CONSTRAINT "FK_f900a9ff024afcf999d6ccf907b" FOREIGN KEY ("worldId") REFERENCES "world"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "worldObjects" DROP CONSTRAINT "FK_f900a9ff024afcf999d6ccf907b"`);
        // await queryRunner.query(`DROP TABLE "worldObjects"`);
    }

}
