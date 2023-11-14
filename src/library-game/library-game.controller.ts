import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { LibraryGameService } from './library-game.service';
import { CreateLibraryGameDto } from "./dto/create-library-game.dto";
import { LibraryGame } from "./entities/library-game.entity";
import { CustomResponseDto } from "../database/dto/custom-response.dto";

@Controller('library-games')
export class LibraryGameController {
  constructor(private readonly libraryGameService: LibraryGameService) {}

  @Post('user/:id')
  async create(
    @Body() createLibraryGameDto: CreateLibraryGameDto,
    @Param('id') userId: number
  ): Promise<CustomResponseDto> {
    return await this.libraryGameService.create(userId, createLibraryGameDto);
  };

  @Get('user/:id')
  async findAll(@Param('id') userId: number): Promise<LibraryGame []> {
    return await this.libraryGameService.findAll(userId);
  };

  @Delete('user/:id/:slug')
  async remove(@Param('id') userId: number, @Param('slug') slug: string): Promise<CustomResponseDto> {
    return await this.libraryGameService.remove(userId, slug);
  };

  @Get('user/:id/:slug')
  async check(@Param('id') userId: number, @Param('slug') slug: string): Promise<boolean> {
    return await this.libraryGameService.check(userId, slug);
  };
}
