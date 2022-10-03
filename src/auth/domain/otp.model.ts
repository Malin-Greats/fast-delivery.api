import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

interface UserJson{
  user_id:string;
  role:string
}
@Entity()
export class UserOTP  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  otp!: string;

  @Column("simple-json")
  user!: UserJson;

  @Column({type: 'bigint'})
  createdAt!: number;

  @Column({type: 'bigint'})
  expiredAt!: number;

}
