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
} from "@nestjs/common";
import { CreateUserRequestDto } from "./dto/requests/CreateUser.request.dto";




@Controller("")
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(
    
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
  @Post()
  public async createContact(
    @Body(new ValidationPipe()) payload: CreateUserRequestDto
  ): Promise<any> {
    
  }
}
