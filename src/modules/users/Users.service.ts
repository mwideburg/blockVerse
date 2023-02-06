import { Logger, Inject, BadRequestException } from "@nestjs/common";
import { transformAndValidate } from "class-transformer-validator";
import { CreateUserRequestDto } from "./dto/requests/CreateUser.request.dto";
import { IUserRepository, USERS_REPOSITORY } from "./interfaces/IUserS.repository";
import { IUserService } from "./interfaces/IUsers.service";
import { User } from "./User.entity";


export class UsersService implements IUserService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUserRepository,
  ) {}
    public async getUser(id: number): Promise<User> {
        return this.usersRepository.getUser(id)
    }

    public async getUsers(): Promise<[User]> {
        return this.usersRepository.getUsers()
    }

    public async createUser(
        payload: Omit<User, "id">
    ): Promise<any> {
        const user = await this.usersRepository.createUser(payload)
        this.logger.log("Successfully created user...");
        return user
    }
}
