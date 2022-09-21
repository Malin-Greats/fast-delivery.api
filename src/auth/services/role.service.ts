import { toNewRole } from "../domain/role.model";
import { RoleIn } from "../dto/role/create-role.dto";
import { RoleOut, toRoleOut } from "../dto/role/get-role.dto";
import { IRoleRepository } from "../ports/role-repository.port";
import { IRolService } from "../ports/role-service.port";

export class RoleService implements IRolService{

    constructor(private _roleRepo:IRoleRepository){}

    async createRole(roleRequest: RoleIn): Promise<RoleOut> {
       const role= await this._roleRepo.create(roleRequest)
       const roleOut=toRoleOut(role)
       return roleOut
    }


   async findRoleById(roleId: string): Promise<RoleOut> {
        const role= await this._roleRepo.findById(roleId)
        const roleOut=toRoleOut(role)
        return roleOut
    }
    async findRoleByName(roleName: string): Promise<RoleOut> {
        const role= await this._roleRepo.findById(roleName)
        const roleOut=toRoleOut(role)
        return roleOut
    }

    async updateRole(roleId: string, updateReq: RoleIn): Promise<RoleOut> {
        throw new Error("Method not implemented.");
    }

    async findAllRoles():Promise<RoleOut[]>{
        const rolesOut:RoleOut[]=[]
       const roles = await this._roleRepo.findAll()
       for (let role of roles){
            const roleOut=toRoleOut(role)
            rolesOut.push(roleOut)
       }
       return rolesOut
    }
}