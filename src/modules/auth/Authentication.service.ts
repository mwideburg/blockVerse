import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt"
import { plainToClass } from "class-transformer";
import { USERS_REPOSITORY, IUserRepository } from "../users/interfaces/IUserS.repository";
import { USERS_SERVICE, IUserService } from "../users/interfaces/IUsers.service";
import { User } from "../users/User";
import { RegisterRequestDto } from "./dto/request/Register.request.dto";


export class AuthenticationService {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersService: IUserService,
    @Inject(USERS_REPOSITORY)
    private readonly usersRepository: IUserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
 
  public async register(registrationData: RegisterRequestDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
        const user = plainToClass(User, { ...registrationData,
        password: hashedPassword})
      const createdUser = await this.usersService.createUser(user);
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByUsername(email);
      await this.verifyPassword(plainTextPassword, user.password)
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }


  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
  const isPasswordMatching = await bcrypt.compare(
    plainTextPassword,
    hashedPassword
  );
  if (!isPasswordMatching) {
    throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
  }
}
}