import { RoleIn } from "../domain/dto/role/role.dto";
import { Role } from "../domain/role.model";
export interface IRoleRepository{
    create(roleIn:RoleIn):Promise<Role>
    delete(roleId:string):Promise<Role>
    update(roleId:string, roleIn:RoleIn):Promise<Role>
    findAll(): Promise<Role[]>
    findById(roleId:string):Promise<Role>
    findByName(roleName:string):Promise<Role>
}