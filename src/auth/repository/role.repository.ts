import { EntityNotFoundError, Repository } from "typeorm";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { Role, toNewRole } from "../domain/role.model";
import { RoleIn } from "../dto/role/create-role.dto";
import { IRoleRepository } from "../ports/role-repository.port";

export class RoleRepository implements IRoleRepository{

    constructor(private ormRepository:Repository<Role>){}

    async create(roleIn: RoleIn): Promise<Role> {
        const newRole = toNewRole(roleIn)
        const role = await this.ormRepository.create(newRole);
        let savedRole!:Role
        try {
             savedRole=await this.ormRepository.save(role)
        } catch (error ) {
            logger.error(error)
            throw error
        }
        return savedRole
    }

    async update(roleId:string,roleIn: RoleIn): Promise<Role> {
        let role= await this.findById(roleId)
        Object.assign(role, roleIn);
        let updateRole!:Role
        try {
             updateRole=await this.ormRepository.save(role);
        } catch (error) {
            logger.error(error)
            throw  error
        }
        return  updateRole
    }

    async findById(roleId: string): Promise<Role> {
        let role!:Role
        try {
           role= await this.ormRepository.findOneOrFail({where:{id:roleId}});
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw  new AppError(`The role with id: ${roleId} doesn't exist`)
            }
            else{
                logger.error(error)
                throw error
            }
        }
        return role
    }

    async findByName(roleName: string): Promise<Role> {
        let role!:Role
        try {
           role= await this.ormRepository.findOneOrFail({where:{name:roleName}});
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw  new AppError(`The role with name: ${roleName} doesn't exist`)
            }
            else{
                logger.error(error)
                throw error
            }
        }
        return role
    }
    

    async findAll(): Promise<Role[]> {
        let roles!:Role[] 
        try {
            roles= await this.ormRepository.find();
        } catch (error) {
            logger.error(error)
            throw error
        }
        return roles
    }

    async delete(roleId: string): Promise<Role> {
        throw new Error("Method not implemented.");
    }

}


