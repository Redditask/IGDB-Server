import { PartialType } from '@nestjs/mapped-types';
import { CreateLibraryGameDto } from './create-library-game.dto';

export class UpdateLibraryGameDto extends PartialType(CreateLibraryGameDto) {}
