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
  UseGuards,
  Request,
  Param,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import JwtAuthenticationGuard from "../auth/guards/JwtAuthentication.guard";
import RequestWithUser from "../auth/interfaces/RequestWithUser.interface";
import { CreateWorldObjectRequestDto } from "./dto/CreateWorldObject.request.dto";
import { GetObjectParamsDto } from "./dto/params/GetObject.params";
import { IWorldObjectService, WORLD_OBJECT_SERVICE } from "./interfaces/IWorldObjectService";
import WorldObject from "./WorldObject";






@Controller("")
export class WorldObjectsController {
  private readonly logger = new Logger(WorldObjectsController.name);

  constructor(
     @Inject(WORLD_OBJECT_SERVICE)
    private readonly worldObjectService: IWorldObjectService,
  ) {}

  @Version("1")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  @Post("create")
  public async createWorldObject(
    @Param() params: GetObjectParamsDto,
    @Request() request: RequestWithUser,
    @Body(new ValidationPipe()) payload: CreateWorldObjectRequestDto
  ): Promise<any> {
    const {user} = request
    const worldObject = await plainToClass(WorldObject, {...payload, worldId: params.worldId})
    return this.worldObjectService.create(worldObject)
  }
  @Version("1")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  @Get("objects/:objectId")
  public async getWorldObject(
   @Param() params: GetObjectParamsDto
  ): Promise<any> {
    return this.worldObjectService.get(params.objectId)
  }

}
