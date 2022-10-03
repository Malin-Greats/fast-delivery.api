import { EntityNotFoundError, Repository } from "typeorm";
import { Role } from "../../auth/domain/role.model";
import { IObject } from "../../shared/dto/filter-by.dto";
import AppError from "../../shared/errors/error";
import { Admin } from "../domain/admin.model";
import { AdminIn, NewAdmin } from "../domain/dto/admin.dto";
import { IAdminRepository } from "../ports/admin-repository.port";

export class AdminRepository implements IAdminRepository{

    constructor(private ormRepository:Repository<Admin>){}

    async save(adminIn: AdminIn, role:Role): Promise<Admin> {
        const newAdmin = await NewAdmin(adminIn);
        newAdmin.role = role
        let saved!:Admin
        try {
            const user = await this.ormRepository.create(newAdmin);
            saved=await this.ormRepository.save(user)
        } catch (error ) {
            throw error
        }
        return saved
    }

    async findById(id: string): Promise<Admin> {
        let admin!:Admin;
        try {
            admin =  await this.ormRepository.findOneOrFail({
                where: { id }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The customer with id: ${id} does not exist!`);
            }else{
                throw error
            }
        }
        return  admin
    }

    async findBy(filter: IObject): Promise<Admin> {
        let admin!:Admin;
        let filterBy= filter.by
        admin =  await this.ormRepository.findOneOrFail({
                where: { ...filterBy}
            })
        return  admin
    }

    async delete(id: string): Promise<Admin> {
        const customer = await this.findById(id);
        let removed!:Admin;
        try {
            removed=await this.ormRepository.remove(customer);
        } catch (error) {
            throw error
        }
        return removed;
    }

    async findAll(): Promise<Admin[]> {
        let customers!:Admin[]
        try {
            customers =await this.ormRepository.find()
        } catch (error) {
            throw  error
        }
        return customers
    }

    async update(id: string, requestIn: IObject): Promise<Admin> {
        const customer = await this.findById(id);
        Object.assign(customer, requestIn.by);
        let updated!:Admin
        try {
            updated=await this.ormRepository.save(customer);
        } catch (error) {
            throw error
        }
        return  updated
    }
}

