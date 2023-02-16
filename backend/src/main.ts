import { NestFactory } from "@nestjs/core"
import { AppModule } from './app.module';
import cookieParser = require("cookie-parser");
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({origin: "http://localhost:3001"});
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();