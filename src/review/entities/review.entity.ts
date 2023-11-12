import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { JoinColumn } from "typeorm/browser";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.review)
  @JoinColumn({name: "username"})
  user: User;

  @Column()
  slug: string;

  @Column()
  text: string;

  @Column()
  rating: number;

  @Column()
  likedUsers: string [];

  @Column()
  dislikedUsers: string [];
}
