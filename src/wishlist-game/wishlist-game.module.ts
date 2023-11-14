import { Module } from '@nestjs/common';
import { WishlistGameService } from './wishlist-game.service';
import { WishlistGameController } from './wishlist-game.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { WishlistGame } from "./entities/wishlist-game.entity";
import { User } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, WishlistGame])],
  controllers: [WishlistGameController],
  providers: [WishlistGameService],
})
export class WishlistGameModule {}
