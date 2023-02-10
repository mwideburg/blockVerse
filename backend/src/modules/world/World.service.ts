import { Logger, Inject, BadRequestException } from "@nestjs/common";
import { WORLD_REPOSITORY, IWorldRepository } from "./interfaces/IWorldRepository";
import { IWorldService } from "./interfaces/IWorldService";
import World from "./World";







export class WorldsService implements IWorldService {
  private readonly logger = new Logger(WorldsService.name);

  constructor(
    @Inject(WORLD_REPOSITORY)
    private readonly worldRepository: IWorldRepository,
  ) {}
    public async createWorld(
        payload: Omit<World, "id">
    ): Promise<any> {
        const user = await this.worldRepository.createWorld(payload)
        this.logger.log("Successfully created user...");
        return user
    }

    getWorldById(id: number): Promise<World> {
        throw new Error("Method not implemented.");
    }
    
    getUserWorlds(id: number): Promise<World[]> {
        return this.worldRepository.getUserWorlds(id)
    }

}
