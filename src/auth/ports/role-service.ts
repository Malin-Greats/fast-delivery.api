import { RoleIn, RoleOut } from "../domain/dto/role/role.dto"

export interface IRoleService{
    createRole(roleIn:RoleIn):Promise<RoleOut>
    findRoleById(roleId:string):Promise<RoleOut>
    findRoleByName(roleName:string):Promise<RoleOut>
    findAllRoles():Promise<RoleOut[]>
    updateRole(roleId:string, roleIn:RoleIn):Promise<RoleOut>
    deleteRole(roleId:string):Promise<RoleOut>
}