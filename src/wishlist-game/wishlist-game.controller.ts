import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishlistGameService } from './wishlist-game.service';
import { CreateWishlistGameDto } from './dto/create-wishlist-game.dto';
import { UpdateWishlistGameDto } from './dto/update-wishlist-game.dto';

@Controller('wishlist-game')
export class WishlistGameController {
  constructor(private readonly wishlistGameService: WishlistGameService) {}

  @Post()
  create(@Body() createWishlistGameDto: CreateWishlistGameDto) {
    return this.wishlistGameService.create(createWishlistGameDto);
  }

  @Get()
  findAll() {
    return this.wishlistGameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistGameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishlistGameDto: UpdateWishlistGameDto) {
    return this.wishlistGameService.update(+id, updateWishlistGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistGameService.remove(+id);
  }
}
