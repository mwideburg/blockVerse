import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "../../db/models/User.model";
import { UsersController } from "./Users.controller";

const stage = process.env.STAGE;

@Module({
  imports: [
    TypeOrmModule.forFeature([
    UserModel
    ]),
  ],
  controllers: [UsersController],
  providers: [
    
  ],
})
export class UsersModule {}
