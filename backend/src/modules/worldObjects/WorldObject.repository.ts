import {
    BadRequestException,
    HttpException,
    HttpStatus,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, Repository } from "typeorm";
import { IWorldObjectRepository } from "./interfaces/IWorldObjectRepository";

import { WorldObjectEntity } from "../../db/entities/WorldObject.entity";
import WorldObject from "./WorldObject";
import { plainToClass } from "class-transformer";

@Injectable()
export class WorldObjectsRepository implements IWorldObjectRepository {
  private readonly logger = new Logger(WorldObjectsRepository.name);

  constructor(
    @InjectRepository(WorldObjectEntity)
    private readonly worldObjectStore: Repository<WorldObjectEntity>
  ) {}
    public async create(world: Omit<WorldObject, "id">): Promise<WorldObject> {
        try{
            const object = await this.worldObjectStore.create(world)
            await this.worldObjectStore.save(object)

            return this.get(object.id)
        }catch(ex){
            throw new BadRequestException("Could not create object")
        }
    }
    public async get(id: number): Promise<WorldObject> {
       try{
            const worldObject = await this.worldObjectStore.findOneOrFail({
                where: {
                id: Equal(id),
                },
            })
            return plainToClass(WorldObject, worldObject)

        }catch(ex){
            throw new HttpException('World with this id does not exist', HttpStatus.NOT_FOUND);
        }
    }
  
}
