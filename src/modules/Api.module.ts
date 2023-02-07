import { HttpException, Module } from "@nestjs/common";
import { APP_FILTER, RouterModule } from "@nestjs/core";
import { AuthenticationModule } from "./auth/Authentoication.module";
import { UsersModule } from "./users/Users.module";



@Module({
  imports: [
    UsersModule,
    AuthenticationModule,
    RouterModule.register([
      {
        path: "users",
        module: UsersModule,
      },
      {
        path: "authentication",
        module: AuthenticationModule,
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
