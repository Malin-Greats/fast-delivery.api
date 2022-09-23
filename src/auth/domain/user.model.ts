import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserIn } from "../dto/user/create-user.dto";
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

    @Column()
    is_verified!:boolean

    @Column()
    is_active!:boolean


    @CreateDateColumn()
    created_at!:Date

    @UpdateDateColumn()
    updated_at!:Date

    @ManyToOne(()=>Role,
    role =>role.users)
    @JoinColumn({name:"role_id"})
    role!:Role

}

export function toNewUser({ firstname, lastname, email, contact, password}:UserIn):User{
    let  user:User = new User()
    user.firstname =firstname
    user.lastname =lastname
    user.email =email
    user.contact =contact
    user.is_active=true
    user.is_verified=false
    user.password=password
    return   user
}