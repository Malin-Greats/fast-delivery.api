import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleIn } from "../dto/role/create-role.dto";
import { User } from "./user.model";
export enum ERole{
    ADMIN="admin",
    DRIVER="driver",
    CUSTOMER="customer"
}

@Entity()
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({
        unique:true,
        type:"enum",
        enum:ERole
    })
    name!: string;

    @Column("text", {nullable:true})
    slug?:string

    @CreateDateColumn()
    created_at!:Date

    @OneToMany(
        ()=>User,
        user=> user.role
    )
    users!:User[]

}

export function toNewRole({name, slug}:RoleIn):Role{
    const role = new Role()
    role.created_at = new Date()
    role.slug=slug
    role.name=name
    return role
}