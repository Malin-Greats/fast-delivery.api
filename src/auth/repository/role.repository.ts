import {  Repository } from "typeorm";
import AppError from "../../common/errors/appErrors";
import { psqlDB } from "../../data-source";
import { Role, toNewRole } from "../domain/role.model";
import { RoleIn } from "../dto/role/create-role.dto";
import { IRoleRepository } from "../ports/role-repository.port";

export class RoleRepository implements IRoleRepository {

    constructor(private ormRepository:Repository<Role> ){}
    async create(roleRequest: RoleIn): Promise<Role> {
        const newRole = toNewRole(roleRequest)
        const role = await this.ormRepository.create(newRole);
        const savedRole=await this.ormRepository.save(role)
        return savedRole
    }

    async findById(roleId: string): Promise<Role> {
        const role = await this.ormRepository.findOneOrFail({where:{ID:roleId}});
        if (!role) {
            throw new AppError(`The role with id: ${roleId} does not exist!`);
        }
        return role
    }

    async findByName(roleName: string): Promise<Role> {
        const role = await this.ormRepository.findOneOrFail({where:{ID:roleName}});
        if (!role) {
            throw new AppError(`The role with name: ${roleName} does not exist!`);
        }
        return role
    }

    async findAll(): Promise<Role[]> {
            const roles = await this.ormRepository.find();
            if (!roles) {
                throw new AppError(`No roles exists!`);
            }
            return roles
    }

    async update(roleId: string, roleRequest: RoleIn): Promise<Role> {
        const role = await this.ormRepository.findOneOrFail({ where: { ID:roleId }});
        if (!role) {
            throw new AppError(`The role with id: ${roleId} does not exist!`);
        }
        Object.assign(role, roleRequest);
        const updatedUser=await this.ormRepository.save(role);
        return  updatedUser
    }

}

