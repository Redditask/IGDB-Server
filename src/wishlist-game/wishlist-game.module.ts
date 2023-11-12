import { Module } from '@nestjs/common';
import { WishlistGameService } from './wishlist-game.service';
import { WishlistGameController } from './wishlist-game.controller';

@Module({
  controllers: [WishlistGameController],
  providers: [WishlistGameService],
})
export class WishlistGameModule {}
