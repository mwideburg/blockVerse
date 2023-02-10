import { Injectable, Logger } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import * as path from "path";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        const stage = process.env.STAGE;

        const defaultOptions = {
        type: "postgres" as const,
        autoLoadEntities: false,
        synchronize: false,
        logging: true,
        entities: [path.join(__dirname, `/entities/*.entity{.ts,.js}`)],
        host: "localhost",
            port: 5432,
            username: "test",
            password: "test",
            database: "testdb",
        };

    
      return {
        ...defaultOptions,
      };
    }
}
