import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { JoinColumn } from "typeorm/browser";

@Entity()
export class LibraryGame {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.library_games)
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

  @Column()
  genres: JSON;

  @Column()
  parent_platforms: JSON;
}
