import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/entities/user.entity";
import { CustomResponseDto } from "../database/dto/custom-response.dto";
import { CreateWishlistGameDto } from "./dto/create-wishlist-game.dto";
import { WishlistGame } from "./entities/wishlist-game.entity";

@Injectable()
export class WishlistGameService {
  constructor(
    @InjectRepository(WishlistGame)
    private wishlistGameRepository: Repository<WishlistGame>,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(userId: number, createWishlistGameDto: CreateWishlistGameDto){

    const user: User = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const libraryGame: WishlistGame = new WishlistGame({
      user: user,
      ...createWishlistGameDto
    });

    await this.wishlistGameRepository.save(libraryGame);

    return new CustomResponseDto(200, 'Wishlist game was successful added');
  };

  async findAll(userId: number): Promise<WishlistGame []> {

    return await this.wishlistGameRepository.find({
      where: {
        user: {
          id: userId
        },
      },
    });
  };

  async remove(userId: number, slug: string): Promise<CustomResponseDto> {

    await this.wishlistGameRepository.delete({
      user: {
        id: userId,
      },
      slug: slug,
    });

    return new CustomResponseDto(200, 'Wishlist game was successful removed');
  };

  async check(userId: number, slug: string): Promise<boolean> {

    const libraryGame: WishlistGame = await this.wishlistGameRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        slug: slug,
      },
    });

    return !!libraryGame;
  };
}
