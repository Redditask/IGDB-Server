import { Injectable } from '@nestjs/common';
import { CreateWishlistGameDto } from './dto/create-wishlist-game.dto';
import { UpdateWishlistGameDto } from './dto/update-wishlist-game.dto';

@Injectable()
export class WishlistGameService {
  create(createWishlistGameDto: CreateWishlistGameDto) {
    return 'This action adds a new wishlistGame';
  }

  findAll() {
    return `This action returns all wishlistGame`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlistGame`;
  }

  update(id: number, updateWishlistGameDto: UpdateWishlistGameDto) {
    return `This action updates a #${id} wishlistGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlistGame`;
  }
}
