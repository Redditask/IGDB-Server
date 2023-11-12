import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

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

  @Column({array: true})
  likedUsers: string;

  @Column({array: true})
  dislikedUsers: string;
}
