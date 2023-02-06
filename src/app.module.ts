import {Module} from "@nestjs/common"
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigModule } from "./db/TypeOrmConfigModule";
import { TypeOrmConfigService } from "./db/TypeOrmConfigService";
import { addTransactionalDataSource } from "typeorm-transactional";
import { DataSource } from "typeorm";
import { ApiModule } from "./modules/Api.module";
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      inject: [TypeOrmConfigService],
      useFactory(typeormConfigOptions: TypeOrmConfigService) {
        return typeormConfigOptions.createTypeOrmOptions();
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error("Invalid options passed");
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    ApiModule
    ]
})

export class AppModule {}