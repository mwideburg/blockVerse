import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorldEntity } from "../../db/entities/World.entity";
import { WorldObjectEntity } from "../../db/entities/WorldObject.entity";
import { WORLD_OBJECT_REPOSITORY } from "./interfaces/IWorldObjectRepository";
import { WORLD_OBJECT_SERVICE } from "./interfaces/IWorldObjectService";
import { WorldObjectsController } from "./WorldObject.controller";
import { WorldObjectsRepository } from "./WorldObject.repository";
import { WorldObjectsService } from "./WorldObject.service";




const stage = process.env.STAGE;

@Module({
  imports: [
    TypeOrmModule.forFeature([
    WorldEntity,
    WorldObjectEntity
    ]),
  ],
  controllers: [WorldObjectsController],
  providers: [
    {provide: WORLD_OBJECT_SERVICE, useClass: WorldObjectsService},
    {provide: WORLD_OBJECT_REPOSITORY, useClass: WorldObjectsRepository}
  ],
  exports: [
    {provide: WORLD_OBJECT_SERVICE, useClass: WorldObjectsService},
    {provide: WORLD_OBJECT_REPOSITORY, useClass: WorldObjectsRepository}]
})
export class WorldObjectsModule {}
