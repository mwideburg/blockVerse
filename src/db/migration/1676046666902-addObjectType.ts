import { MigrationInterface, QueryRunner } from "typeorm";

export class addObjectType1676046666902 implements MigrationInterface {
    name = 'addObjectType1676046666902'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE "worlds" CASCADE`);
        await queryRunner.query(`TRUNCATE "worldObjects"`);
        await queryRunner.query(`TRUNCATE "user" CASCADE`);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "worldObjects" DROP 'objectType' int NOT NULL`);
        
    }

}
