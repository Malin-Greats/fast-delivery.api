import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserOTP_JSON } from "./dto/auth/otp.dto";

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

    @Column("simple-json")
    user!:UserOTP_JSON;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
  }
  