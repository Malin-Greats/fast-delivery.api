import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserIn } from "../dto/user/create-user.dto";
import { Role } from "./role.model";


@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    ID!: string;

    @Column({unique:true})
    username!: string;

    @Column({unique:true}) 
    contact!:string

    @Column({unique:true})
    email!:string

    @Column()
    password!: string;

    @Column()
    isVerified!:boolean

    @Column()
    isActive!:boolean

    @Column()
    roleId!:string

    @Column()
    createdAt!:Date

}

export function toNewUser({ username, email, contact,roleId, password}:UserIn):User{
    let  user:User = new User()
    
    user.username =username
    user.email =email
    user.contact =contact
    user.isActive=true
    user.isVerified=false
    user.createdAt=new Date()
    user.password=password
    user.roleId=roleId

    return   user
}