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
import { transformAndValidate } from "class-transformer-validator";
import JwtAuthenticationGuard from "../auth/guards/JwtAuthentication.guard";
import { CreateUserRequestDto } from "./dto/requests/CreateUser.request.dto";
import { IUserService, USERS_SERVICE } from "./interfaces/IUsers.service";
import { User } from "./User";




@Controller("")
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
     @Inject(USERS_SERVICE)
    private readonly userService: IUserService,
  ) {}

  //   @ApplyApiResponses()
  @Version("1")
  @HttpCode(HttpStatus.OK)  
  @Get()
  public async findAll(): Promise<any> {
    return 'This action returns all users';
  }
  @Version("1")
  @HttpCode(HttpStatus.OK)  
  @UseGuards(JwtAuthenticationGuard)
  @Get(":id")
  public async getUser(
    @Param() param: any
  ): Promise<any> {
    return this.userService.getUser(param.id)
  }

  @Version("1")
  @HttpCode(HttpStatus.OK)
  @Post()
  public async createUser(
    @Body(new ValidationPipe()) payload: CreateUserRequestDto
  ): Promise<any> {
    const user = plainToClass(User, payload)
    this.userService.createUser(user)
  }
}
