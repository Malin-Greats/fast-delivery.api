import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserIn } from "./dto/user/user.dto";
import { Role } from "./role.model";


@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({unique:true})
    email!:string

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;

    @Column({unique:true})
    contact!:string

    @Column()
    password!: string;

    @Column({nullable:true})
    profile_photo?:string

    @Column()
    is_verified!:boolean

    @Column()
    is_active!:boolean


    @CreateDateColumn()
    created_at!:Date

    @UpdateDateColumn()
    updated_at!:Date

    @ManyToOne(()=>Role,
    role =>role.users,
    {eager:true})
    @JoinColumn({name:"role_id"})
    role!:Role

}

