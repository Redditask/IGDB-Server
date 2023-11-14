import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { LibraryGameModule } from './library-game/library-game.module';
import { WishlistGameModule } from './wishlist-game/wishlist-game.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    ReviewModule,
    LibraryGameModule,
    WishlistGameModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
