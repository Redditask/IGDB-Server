import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn
} from "typeorm";
import { Review } from "../../review/entities/review.entity";
import { LibraryGame } from "../../library-game/entities/library-game.entity";
import { WishlistGame } from "../../wishlist-game/entities/wishlist-game.entity";
import { BaseEntity } from "../../database/entities/baseEntity";

@Entity()
export class User extends BaseEntity<User>{
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isActivated: boolean;

  @Column()
  activationLink: string;

  @Column({type: "json", nullable: true})
  platforms: JSON;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Review, (review: Review) => review.user, {
    onDelete: "CASCADE"
  })
  review: Review;

  @OneToMany(() => LibraryGame, (libraryGame: LibraryGame) => libraryGame.user, {
    onDelete: "CASCADE"
  })
  library_games: LibraryGame [];

  @OneToMany(() => WishlistGame, (wishlistGame: WishlistGame) => wishlistGame.user, {
    onDelete: "CASCADE"
  })
  wishlist_games: WishlistGame [];

  @Column()
  refreshToken: string;
}
