import {Module} from "@nestjs/common"
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigModule } from "./db/TypeOrmConfigModule";
import { TypeOrmConfigService } from "./db/TypeOrmConfigService";
import { addTransactionalDataSource } from "typeorm-transactional";
import { DataSource } from "typeorm";
import { ApiModule } from "./modules/Api.module";

import { DatabaseModule } from "./database.module";
import Joi = require("@hapi/joi");
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DB: Joi.string().required(),
                PORT: Joi.number(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRATION_TIME: Joi.string().required(),
            })
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
        ApiModule,
        DatabaseModule
    ]
})

export class AppModule {}