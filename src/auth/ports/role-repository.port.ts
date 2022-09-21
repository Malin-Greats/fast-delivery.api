import { Repository } from "typeorm";
import { Role } from "../domain/role.model";
import { RoleIn } from "../dto/role/create-role.dto";

export interface IRoleRepository {
    create(roleRequest: RoleIn): Promise<Role>
    findById(roleId: string): Promise<Role>
    findByName(roleName: string): Promise<Role>
    findAll(): Promise<Role[]>
    update(roleId: string, roleRequest: RoleIn): Promise<Role>
}