import { Module } from '@nestjs/common';
import { LibraryGameService } from './library-game.service';
import { LibraryGameController } from './library-game.controller';

@Module({
  controllers: [LibraryGameController],
  providers: [LibraryGameService],
})
export class LibraryGameModule {}
