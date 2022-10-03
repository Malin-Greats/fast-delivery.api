import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "../../admin/domain/admin.model";
import { Customer } from "../../customers/domain/customer.model";
import { Driver } from "../../drivers/domain/driver.model";
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

    @OneToMany(()=>Customer,customer=> customer.role)
    customers!:Customer[]

    @OneToMany(()=>Driver,driver=> driver.role)
    drivers!:Driver[]

    @OneToMany(()=>Admin,admin=> admin.role)
    admins!:Admin[]

}

