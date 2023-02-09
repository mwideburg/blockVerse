import { NestFactory } from "@nestjs/core"
import { AppModule } from './app.module';
import * as expressListRoutes from 'express-list-routes';
import cookieParser = require("cookie-parser");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();