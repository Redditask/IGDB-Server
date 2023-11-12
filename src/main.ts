import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();

//  updateDto разобраться

// ToDo:
//  больше валидаторов добавить
//  platforms в user entity зарефакторить
//  ^ аналогично с genres, parent_platforms в games
