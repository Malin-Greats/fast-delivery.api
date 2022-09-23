import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

@Entity()
export class UserOTP  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  otp!: string;

  @Column()
  user_id!: string;

  @Column({type: 'bigint'})
  createdAt!: number;

  @Column({type: 'bigint'})
  expiredAt!: number;

  @OneToOne(type => User) @JoinColumn({name:"user_id"})
   user!: User;
}
