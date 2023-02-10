import {
    HttpException,
    HttpStatus,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Repository, Equal } from "typeorm";
import { WorldEntity } from "../../db/entities/World.entity";


import * as bcrypt from "bcrypt"
import { IWorldRepository } from "./interfaces/IWorldRepository";
import World from "./World";

@Injectable()
export class WorldsRepository implements IWorldRepository {
  private readonly logger = new Logger(WorldsRepository.name);

  constructor(
    @InjectRepository(WorldEntity)
    private readonly worldStore: Repository<WorldEntity>
  ) {}
    public async createWorld(world: Omit<World, "id">): Promise<World> {
        try{
            const newWorld = await this.worldStore.create({...world})
            await this.worldStore.save(newWorld)
            return this.getWorldById(newWorld.id)
        }catch(ex){
            this.logger.log(ex)
            throw new Error("Could not create world....")
        }
    }

    public async getWorldById(id: number): Promise<World> {
        try{
            const world = await this.worldStore.findOneOrFail({
            where: {
              id: Equal(id),
            }})
    
            return plainToClass(World, world)
        }catch(ex){
            throw new HttpException('World with this id does not exist', HttpStatus.NOT_FOUND);
        }

    }

    getUserWorlds(id: number): Promise<World[]> {
        throw new Error("Method not implemented.");
    }
  
}
