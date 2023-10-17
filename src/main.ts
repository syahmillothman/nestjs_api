import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: [
              'http://localhost:4300',
              'http://localhost:4200'
            ],
    credentials: true
  });
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));
  await app.listen(3000);
}
bootstrap().then();
