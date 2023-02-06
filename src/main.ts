import { NestFactory } from "@nestjs/core"
import { AppModule } from './app.module';
import * as expressListRoutes from 'express-list-routes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5432);

  const server = await app.getHttpServer();
  const router = await server._events.request._router;
  console.log(expressListRoutes({}, 'API:', router));
}
bootstrap();