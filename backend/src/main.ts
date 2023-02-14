import { NestFactory } from "@nestjs/core"
import { AppModule } from './app.module';
import cookieParser = require("cookie-parser");
const port = process.env.PORT || 5000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  await app.listen(port, () => console.log(`Server is running on port ${port}`));
}
bootstrap();