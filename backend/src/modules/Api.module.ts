import { HttpException, Module } from "@nestjs/common";
import { APP_FILTER, RouterModule } from "@nestjs/core";
import { AuthenticationModule } from "./auth/Authentoication.module";
import { UsersModule } from "./users/Users.module";
import { WorldsModule } from "./world/World.module";
import { WorldObjectsModule } from "./worldObjects/WorldObject.module";



@Module({
  imports: [
    UsersModule,
    AuthenticationModule,
    WorldsModule,
    WorldObjectsModule,
    RouterModule.register([
      {
        path: "users",
        module: UsersModule,
      },
      {
        path: "authentication",
        module: AuthenticationModule,
      },
      {
        path: "users/:userId/worlds",
        module: WorldsModule,
      },
      {
        path: "users/:userId/worlds/:worldId",
        module: WorldObjectsModule,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpException,
    },
  ],
})
export class ApiModule {}
