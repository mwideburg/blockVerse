import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../../db/entities/User.entity";
import { USERS_REPOSITORY } from "./interfaces/IUserS.repository";
import { USERS_SERVICE } from "./interfaces/IUsers.service";
import { UsersController } from "./Users.controller";
import { UsersRepository } from "./Users.repository";
import { UsersService } from "./Users.service";

const stage = process.env.STAGE;

@Module({
  imports: [
    TypeOrmModule.forFeature([
    UserEntity
    ]),
  ],
  controllers: [UsersController],
  providers: [
    {provide: USERS_SERVICE, useClass: UsersService},
    {provide: USERS_REPOSITORY, useClass: UsersRepository}
  ],
  exports: [
    {provide: USERS_SERVICE, useClass: UsersService},
    {provide: USERS_REPOSITORY, useClass: UsersRepository}]
})
export class UsersModule {}
