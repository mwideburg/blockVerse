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
import { UserEntity } from "../../db/entities/User.entity";
import { IUserRepository } from "./interfaces/IUserS.repository";
import { User } from "./User";
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersRepository implements IUserRepository {
  private readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userStore: Repository<UserEntity>
  ) {}
    

    public async createUser(user: Omit<User, "id">): Promise<User> {
        try{
            user.password = await this.createHash(user.password)

            const newUser = await this.userStore.create(user)
            await this.userStore.save(newUser)

            return this.getUser(newUser.id)
        }catch(ex){
            this.logger.log(ex)
            throw new Error("Could not create user....")
        }
    }
    public async getUser(id: number): Promise<User> {
        try{
            const user = await this.userStore.findOneOrFail({
            where: {
              id: Equal(id),
            }})
    
            return plainToClass(User, user)
        }catch(ex){
            throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
        }

    }
    getUsers(): Promise<[User]> {
        throw new Error("Method not implemented.");
    }

    public async getByUsername(userName: string): Promise<User> {
        const user = await this.userStore.findOneOrFail({
        where: {
          userName: Equal(userName),
        }})

        return plainToClass(User, user)
    }

    private async createHash(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    private async passwordIsMatching(password: string, user: User): Promise<string> {
        const isPasswordMatching = await bcrypt.compare(password, user.password);
        return bcrypt.hash(password, 10)
    }

  
}
