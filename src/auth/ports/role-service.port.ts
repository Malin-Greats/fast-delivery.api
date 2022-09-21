import { RoleIn } from "../dto/role/create-role.dto"
import { RoleOut } from "../dto/role/get-role.dto"

export interface IRolService{
    createRole(roleInput: RoleIn):Promise<RoleOut>
    findRoleById(roleId:string):Promise<RoleOut>
    findRoleByName(name: string):Promise<RoleOut>
    updateRole(roleId:string, updateReq:RoleIn):Promise<RoleOut>
    findAllRoles():Promise<RoleOut[]>
}