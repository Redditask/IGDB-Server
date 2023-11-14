import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5, {
    message: "Username is too short",
  })
  @MaxLength(14, {
    message: "Username is too long",
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4, {
    message: "Password is too short",
  })
  @MaxLength(32, {
    message: "Password is too long",
  })
  password: string;
}
