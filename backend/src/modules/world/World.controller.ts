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
  Request,
  UnauthorizedException,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import JwtAuthenticationGuard from "../auth/guards/JwtAuthentication.guard";
import UserAuthenticationGuard from "../auth/guards/UserAuthentication.guard";
import RequestWithUser from "../auth/interfaces/RequestWithUser.interface";
import { CreateWorldRequestDto } from "./dto/requests/CreateWorld.request.dto";
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
  @UseGuards(JwtAuthenticationGuard)
  @Post("")
  public async createWorld(
    @Request() request: RequestWithUser,
    @Param() param: CreateWorldRequestParams,
    @Body(new ValidationPipe()) payload: CreateWorldRequestDto
  ): Promise<any> {
    const {user} = request
    if(user.id !== Number(param.userId)){
        throw new UnauthorizedException();
    }
    const world = plainToClass(World, {...payload, createdBy: user.id})
    world.creator = user
    return this.worldService.createWorld(world)
  }

  @Version("1")
  @HttpCode(HttpStatus.OK)  
//   @UseGuards(JwtAuthenticationGuard)
  @Get("")
  public async getUserWorlds(
    @Param() param: any
  ): Promise<any> {
    return this.worldService.getUserWorlds(param.userId)
  }

}
