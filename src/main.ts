import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(AppModule.port);
}
bootstrap();
