import { HttpException, Module } from "@nestjs/common";
import { APP_FILTER, RouterModule } from "@nestjs/core";
import { UsersModule } from "./users/Users.module";



@Module({
  imports: [
    RouterModule.register([
      {
        path: "users",
        module: UsersModule,
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
