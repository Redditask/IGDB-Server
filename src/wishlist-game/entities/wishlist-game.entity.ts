import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class WishlistGame {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.wishlist_games)
  @JoinColumn({name: "user_id"})
  user: User;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column()
  released: string;

  @Column()
  background_image: string;

  @Column()
  metacritic: number;

  @Column({type: "json", array: true})
  genres: JSON;

  @Column({type: "json", array: true})
  parent_platforms: JSON;
}
