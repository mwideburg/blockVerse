import {
  Controller,
  Logger,
  Version,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  Inject,
  Param,
  UseGuards,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import JwtAuthenticationGuard from "../auth/guards/JwtAuthentication.guard";
import { CreateWorldRequestDto } from "./dto/CreateWorld.request.dto";
import { IWorldService, WORLD_SERVICE } from "./interfaces/IWorldService";
import World from "./World";




@Controller("")
export class WorldsController {
  private readonly logger = new Logger(WorldsController.name);

  constructor(
     @Inject(WORLD_SERVICE)
    private readonly worldService: IWorldService,
  ) {}

  //   @ApplyApiResponses()
  @Version("1")
  @HttpCode(HttpStatus.OK)
  @Post()
  public async createWorld(
    @Body(new ValidationPipe()) payload: CreateWorldRequestDto
  ): Promise<any> {
    const world = plainToClass(World, payload)
    this.worldService.createWorld(world)
  }

//   @Version("1")
//   @HttpCode(HttpStatus.OK)  
//   @UseGuards(JwtAuthenticationGuard)
//   @Get(":id")
//   public async getWorld(
//     @Param() param: any
//   ): Promise<any> {
//     return this.worldService.getWorld(param.id)
//   }

}
