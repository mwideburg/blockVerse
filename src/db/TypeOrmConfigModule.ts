import { Module } from "@nestjs/common";
import { TypeOrmConfigService } from "./TypeOrmConfigService";

@Module({
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
