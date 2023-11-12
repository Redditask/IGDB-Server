import { IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @MinLength(15, {
    message: "Review is too short",
  })
  @MaxLength(255, {
    message: "Review is too long",
  })
  text: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
