import { Module } from '@nestjs/common';
import { AuthenticationService } from './Authentication.service';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './Authentication.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/Local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/Jwt.strategy';
import { UserEntity } from '../../db/entities/User.entity';
import { UsersService } from '../users/Users.service';
import { USERS_SERVICE } from '../users/interfaces/IUsers.service';
import { USERS_REPOSITORY } from '../users/interfaces/IUserS.repository';
import { UsersRepository } from '../users/Users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
 
@Module({
    imports: [
    UsersModule,
    PassportModule, 
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: "jwtSecret",
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
],
  providers: [
    //   {
    //   provide: USERS_SERVICE,
    //   useClass: UsersService
    //   },
    //   {
    //   provide: USERS_REPOSITORY,
    //   useClass: UsersRepository
    //   },
    UsersService,
    UsersRepository,
    AuthenticationService, 
    LocalStrategy, 
    JwtStrategy,
],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}