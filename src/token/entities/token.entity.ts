import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refreshToken: string;

  @OneToOne(() => User, (user) => user.token)
  @JoinColumn({name: "user_id"})
  user: User;
}
