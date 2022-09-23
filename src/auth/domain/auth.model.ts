import { BaseEntity, Column, CreateDateColumn, Entity, Generated, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.model";

  export interface IUserToken {
    id: string;
    token: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
  }
  @Entity()
  export class UserToken extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    token!: string;

    @Column()
    user_id!: string;

    @OneToOne(type => User) @JoinColumn()
    user!: User;
    
    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
  }
  