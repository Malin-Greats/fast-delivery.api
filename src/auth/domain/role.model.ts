import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleIn } from "../dto/role/create-role.dto";


@Entity()
export class Role extends BaseEntity{
    @PrimaryGeneratedColumn()
    ID!: string;

    @Column({unique:true})
    name!: string;

    @Column("text", {nullable:true})
    slug?:string

    @Column()
   createdAt!:Date

}

export function toNewRole({name, slug}:RoleIn):Role{
    const role = new Role()
    role.createdAt = new Date()
    role.slug=slug
    role.name=name
    return role
}