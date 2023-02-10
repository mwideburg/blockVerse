import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorldEntity } from "../../db/entities/World.entity";
import { WORLD_REPOSITORY } from "./interfaces/IWorldRepository";
import { WORLD_SERVICE } from "./interfaces/IWorldService";
import { WorldsController } from "./World.controller";
import { WorldsRepository } from "./World.repository";
import { WorldsService } from "./World.service";


const stage = process.env.STAGE;

@Module({
  imports: [
    TypeOrmModule.forFeature([
    WorldEntity
    ]),
  ],
  controllers: [WorldsController],
  providers: [
    {provide: WORLD_SERVICE, useClass: WorldsService},
    {provide: WORLD_REPOSITORY, useClass: WorldsRepository}
  ],
  exports: [
    {provide: WORLD_SERVICE, useClass: WorldsService},
    {provide: WORLD_REPOSITORY, useClass: WorldsRepository}]
})
export class WorldsModule {}
