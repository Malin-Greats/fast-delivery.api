import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import { OnlineStatus } from "../enums/online-status.enum";

@Entity()
export class Person extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({unique:true})
    email!:string

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;

    @Column({unique:true})
    phone_number!:string

    @Column()
    password!: string;

    @Column({nullable:true})
    profile_photo?:string

    @Column()
    is_verified!:boolean

    @Column()
    is_active!:boolean

    @Column({default:0})
    rating!:number

    @Column({
            type:"enum",
            enum:OnlineStatus
        })
    online_status!:OnlineStatus

    @CreateDateColumn()
    created_at!:Date

    @UpdateDateColumn()
    updated_at!:Date

}