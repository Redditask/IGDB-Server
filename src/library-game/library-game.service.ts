import { Injectable } from '@nestjs/common';
import { CreateLibraryGameDto } from './dto/create-library-game.dto';
import { UpdateLibraryGameDto } from './dto/update-library-game.dto';

@Injectable()
export class LibraryGameService {
  create(createLibraryGameDto: CreateLibraryGameDto) {
    return 'This action adds a new libraryGame';
  }

  findAll() {
    return `This action returns all libraryGame`;
  }

  findOne(id: number) {
    return `This action returns a #${id} libraryGame`;
  }

  update(id: number, updateLibraryGameDto: UpdateLibraryGameDto) {
    return `This action updates a #${id} libraryGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} libraryGame`;
  }
}
