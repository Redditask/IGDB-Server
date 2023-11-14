import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { LibraryGame } from "./entities/library-game.entity";
import { Repository } from "typeorm";
import { CreateLibraryGameDto } from "./dto/create-library-game.dto";
import { User } from "../user/entities/user.entity";
import { CustomResponseDto } from "../database/dto/custom-response.dto";

@Injectable()
export class LibraryGameService {
  constructor(
    @InjectRepository(LibraryGame)
    private libraryGameRepository: Repository<LibraryGame>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: number, createLibraryGameDto: CreateLibraryGameDto){

    const user: User = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    const libraryGame: LibraryGame = new LibraryGame({
      user: user,
      ...createLibraryGameDto
    });

    await this.libraryGameRepository.save(libraryGame);

    return new CustomResponseDto(200, 'Library game was successful added');
  };

  async findAll(userId: number): Promise<LibraryGame []> {

    return await this.libraryGameRepository.find({
      where: {
        user: {
          id: userId
        },
      },
    });
  };

  async remove(userId: number, slug: string): Promise<CustomResponseDto> {

    await this.libraryGameRepository.delete({
      user: {
        id: userId,
      },
      slug: slug,
    });

    return new CustomResponseDto(200, 'Library game was successful removed');
  };

  async check(userId: number, slug: string): Promise<boolean> {

    const libraryGame: LibraryGame = await this.libraryGameRepository.findOne({
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
