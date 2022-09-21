import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

  export interface IUserToken {
    id: string;
    token: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
  }
  @Entity('user_tokens')
  export class UserToken implements IUserToken {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    @Generated()
    token!: string;

    @Column()
    user_id!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
  }
  