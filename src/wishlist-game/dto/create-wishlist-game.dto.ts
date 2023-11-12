import { IsInt, IsJSON, IsNotEmpty, IsString, Min, ValidateNested } from "class-validator";

export class CreateWishlistGameDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  released: string;

  @IsString()
  @IsNotEmpty()
  background_image: string;

  @IsInt()
  @IsNotEmpty()
  metacritic: number;

  @IsJSON()
  @ValidateNested({ each: true })
  genres: JSON [];

  @IsJSON()
  @ValidateNested({ each: true })
  parent_platforms: JSON [];
}
