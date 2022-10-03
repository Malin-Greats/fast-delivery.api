import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { Role } from "../../auth/domain/role.model";
import { Person } from "../../shared/entities/person";

@Entity("admin")
export class Admin extends Person{
    
    @ManyToOne(()=>Role,role =>role.admins,{eager:true})
    @JoinColumn({name:"role_id"})
    role!:Role
}