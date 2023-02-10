import { Logger, Inject, BadRequestException } from "@nestjs/common";
import { IWorldService } from "../world/interfaces/IWorldService";
import { WORLD_OBJECT_REPOSITORY, IWorldObjectRepository } from "./interfaces/IWorldObjectRepository";
import { IWorldObjectService } from "./interfaces/IWorldObjectService";
import WorldObject from "./WorldObject";

export class WorldObjectsService implements IWorldObjectService {
  private readonly logger = new Logger(WorldObjectsService.name);

  constructor(
    @Inject(WORLD_OBJECT_REPOSITORY)
    private readonly worldObjectRepository: IWorldObjectRepository,
  ) {}
    
    public async create(
        payload: Omit<WorldObject, "id">
    ): Promise<any> {
        const worldObject = await this.worldObjectRepository.create(payload)
        this.logger.log("Successfully created object...");
        return worldObject
    }

    public async get(id: number): Promise<WorldObject> {
       const worldObject = await this.worldObjectRepository.get(id)
        this.logger.log("Successfully created object...");
        return worldObject
    }
    

}
