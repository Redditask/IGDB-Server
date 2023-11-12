import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LibraryGameService } from './library-game.service';
import { CreateLibraryGameDto } from './dto/create-library-game.dto';
import { UpdateLibraryGameDto } from './dto/update-library-game.dto';

@Controller('library-game')
export class LibraryGameController {
  constructor(private readonly libraryGameService: LibraryGameService) {}

  @Post()
  create(@Body() createLibraryGameDto: CreateLibraryGameDto) {
    return this.libraryGameService.create(createLibraryGameDto);
  }

  @Get()
  findAll() {
    return this.libraryGameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libraryGameService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLibraryGameDto: UpdateLibraryGameDto) {
    return this.libraryGameService.update(+id, updateLibraryGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.libraryGameService.remove(+id);
  }
}
