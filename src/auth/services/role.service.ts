
import { RoleIn, RoleOut, toRoleOut } from "../domain/dto/role/role.dto";
import { IRoleRepository } from "../ports/role-repository.port";
import { IRoleService } from "../ports/role-service";

export class RoleService implements IRoleService{

    constructor(private _roleRepository:IRoleRepository){}

    async createRole(roleIn: RoleIn): Promise<RoleOut> {
        const role = await this._roleRepository.create(roleIn)
        return toRoleOut(role)
    }
    async findRoleById(roleId: string): Promise<RoleOut> {
        const role= await this._roleRepository.findById(roleId)
        return toRoleOut(role)
    }
    async findRoleByName(roleName: string): Promise<RoleOut> {
        const role= await this._roleRepository.findByName(roleName)
        return toRoleOut(role)
    }
    async findAllRoles(): Promise<RoleOut[]> {
        let rolesOut:RoleOut[]=[]
        const roles=await this._roleRepository.findAll()
        for (let role of roles){
            const roleOut=toRoleOut(role)
            rolesOut.push(roleOut)
        }
        return  rolesOut
    }
    async updateRole(roleId: string, roleIn: RoleIn): Promise<RoleOut> {
        const role= await this._roleRepository.update(roleId, roleIn)
        return  toRoleOut(role)
    }
    async deleteRole(roleId: string): Promise<RoleOut> {
        const role = await this._roleRepository.delete(roleId)
        return role
    }
    
}