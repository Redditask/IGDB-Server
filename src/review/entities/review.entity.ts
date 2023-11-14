import { Column, Entity, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { BaseEntity } from "../../database/entities/baseEntity";

@Entity()
export class Review extends BaseEntity<Review>{
  @ManyToOne(() => User, (user: User) => user.review)
  @JoinColumn({name: "username"})
  user: User;

  @Column()
  slug: string;

  @Column()
  text: string;

  @Column()
  rating: number;

  @Column({array: true})
  likedUsers: string [];

  @Column({array: true})
  dislikedUsers: string [];
}
