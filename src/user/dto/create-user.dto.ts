import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(5, {
    message: "Username is too short",
  })
  @MaxLength(14, {
    message: "Username is too long",
  })
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4, {
    message: "Password is too short",
  })
  @MaxLength(32, {
    message: "Password is too long",
  })
  password: string;
}
