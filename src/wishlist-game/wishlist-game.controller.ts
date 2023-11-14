import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WishlistGameService } from './wishlist-game.service';
import { CreateWishlistGameDto } from './dto/create-wishlist-game.dto';
import { CustomResponseDto } from "../database/dto/custom-response.dto";
import { WishlistGame } from "./entities/wishlist-game.entity";

@Controller('wishlist-games')
export class WishlistGameController {
  constructor(private readonly wishlistGameService: WishlistGameService) {}

  @Post('user/:id')
  async create(
    @Body() createWishlistGameDto: CreateWishlistGameDto,
    @Param('id') userId: number
  ): Promise<CustomResponseDto> {
    return await this.wishlistGameService.create(userId, createWishlistGameDto);
  };

  @Get('user/:id')
  async findAll(@Param('id') userId: number): Promise<WishlistGame []> {
    return await this.wishlistGameService.findAll(userId);
  };

  @Delete('user/:id/:slug')
  async remove(@Param('id') userId: number, @Param('slug') slug: string): Promise<CustomResponseDto> {
    return await this.wishlistGameService.remove(userId, slug);
  };

  @Get('user/:id/:slug')
  async check(@Param('id') userId: number, @Param('slug') slug: string): Promise<boolean> {
    return await this.wishlistGameService.check(userId, slug);
  };
}
