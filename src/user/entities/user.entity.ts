import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Review } from "../../review/entities/review.entity";
import { LibraryGame } from "../../library-game/entities/library-game.entity";
import { WishlistGame } from "../../wishlist-game/entities/wishlist-game.entity";
import { Token } from 'src/token/entities/token.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  platforms: JSON [];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Review, (review) => review.user, { onDelete: "CASCADE" })
  review: Review;

  @OneToMany(() => LibraryGame, (libraryGame) => libraryGame.user, { onDelete: "CASCADE" })
  library_games: LibraryGame [];

  @OneToMany(() => WishlistGame, (wishlistGame) => wishlistGame.user, { onDelete: "CASCADE" })
  wishlist_games: WishlistGame [];

  @OneToOne(() => Token, (token) => token.user, { onDelete: "CASCADE" })
  token: Token;
}
