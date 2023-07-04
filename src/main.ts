import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

dotenv.config({
  path: process.env.NODE_ENV
    ? `${__dirname}/../env/${process.env.NODE_ENV}.env`
    : `${__dirname}/../env/dev.env`,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(
    process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000,
  );
}
bootstrap();
