import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { BaseEntity } from "../../database/entities/baseEntity";

@Entity()
export class LibraryGame extends BaseEntity<LibraryGame>{
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

  @Column({type: "json"})
  genres: JSON;

  @Column({type: "json"})
  parent_platforms: JSON;
}
