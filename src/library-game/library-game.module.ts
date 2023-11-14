import { Module } from '@nestjs/common';
import { LibraryGameService } from './library-game.service';
import { LibraryGameController } from './library-game.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { LibraryGame } from "./entities/library-game.entity";
import { User } from "../user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, LibraryGame])],
  controllers: [LibraryGameController],
  providers: [LibraryGameService],
})
export class LibraryGameModule {}
