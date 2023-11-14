import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();

// ToDo:
//  ошибки добавить
//  доставать юзера из auth мидллвейра
//  как-то объединить findAll library и wishlist-games
//  больше валидаторов добавить
//  platforms в user entity зарефакторить
//  ^ аналогично с genres, parent_platforms в games
