import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { Repository, Equal } from "typeorm";
import { UserEntity } from "../../db/entities/User.entity";
import { IUserRepository } from "./interfaces/IUserS.repository";
import { User } from "./User.entity";


@Injectable()
export class UsersRepository implements IUserRepository {
  private readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userStore: Repository<UserEntity>
  ) {}

    public async createUser(user: Omit<User, "id">): Promise<User> {
        try{
            console.log("USER", user)
            const newUser = await this.userStore.create(user)
            const savedUser = await this.userStore.save(newUser)
            console.log("NEW USER", newUser)
            return this.getUser(newUser.id)
        }catch(ex){
            this.logger.log(ex)
            throw new Error("Could not create user....")
        }
    }
    public async getUser(id: number): Promise<User> {
        const user = await this.userStore.findOneOrFail({
        where: {
          id: Equal(id),
        }})

        return plainToClass(User, user)

    }
    getUsers(): Promise<[User]> {
        throw new Error("Method not implemented.");
    }

  
}
