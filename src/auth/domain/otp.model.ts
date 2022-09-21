import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserOTP  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  otp!: string;

  @Column()
  userId!: string;

  @Column({type: 'bigint'})
  createdAt!: number;

    @Column({type: 'bigint'})
  expiredAt!: number;
}
