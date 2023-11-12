import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "../../user/dto/create-user.dto";

export class CreateTokenDto extends PartialType(CreateUserDto){}
