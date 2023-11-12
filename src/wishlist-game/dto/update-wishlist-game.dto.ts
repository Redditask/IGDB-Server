import { PartialType } from '@nestjs/mapped-types';
import { CreateWishlistGameDto } from './create-wishlist-game.dto';

export class UpdateWishlistGameDto extends PartialType(CreateWishlistGameDto) {}
