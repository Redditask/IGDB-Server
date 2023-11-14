import { IsInt, IsJSON, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateLibraryGameDto {
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
  genres: JSON;

  @IsJSON()
  @ValidateNested({ each: true })
  parent_platforms: JSON;
}
