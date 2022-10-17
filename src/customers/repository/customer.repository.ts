import { EntityNotFoundError, Repository } from "typeorm";
import { Role } from "../../auth/domain/role.model";
import { IObject } from "../../shared/dto/filter-by.dto";
import AppError from "../../shared/errors/error";
import { Customer } from "../domain/customer.model";
import { CustomerIn, NewCustomer } from "../domain/dto/customer.dto";
import { ICustomerRepo } from "../ports/customer-repo.port";

export class CustomerRepo implements ICustomerRepo{

    constructor(private ormRepository:Repository<Customer>){}

    async save(customerIn: CustomerIn, role:Role): Promise<Customer> {
        const newCustomer = await NewCustomer(customerIn);
        newCustomer.role = role
        let saved!:Customer
        try {
            const user = await this.ormRepository.create(newCustomer);
            saved=await this.ormRepository.save(user)
        } catch (error ) {
            const {code} =<{code:string}>error
            if (code==="23505"){
                let  err =error as AppError
                throw new AppError("User already exist: ", err.detail)
            }
            throw error
        }
        return saved
    }

    async findById(id: string): Promise<Customer> {
        let customer!:Customer;
        try {
            customer =  await this.ormRepository.findOneOrFail({
                where: { id }
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The customer with id: ${id} does not exist!`,undefined,404);
            }else{
                throw error
            }
        }
        return  customer
    }

    async findBy(filter: IObject): Promise<Customer> {
        let customer!:Customer;
        customer =  await this.ormRepository.findOneOrFail({
                where: filter.by
            })
        return  customer
    }

    async delete(id: string): Promise<Customer> {
        const customer = await this.findById(id);
        let removed!:Customer;
        try {
            removed=await this.ormRepository.remove(customer);
        } catch (error) {
            throw error
        }
        return removed;
    }

    async findAll(): Promise<Customer[]> {
        let customers!:Customer[]
        try {
            customers =await this.ormRepository.find()
        } catch (error) {
            throw  error
        }
        return customers
    }

    async update(id: string, requestIn: IObject): Promise<Customer> {
        const customer = await this.findById(id);
        Object.assign(customer, requestIn.by);
        let updated!:Customer
        try {
            updated=await this.ormRepository.save(customer);
        } catch (error) {
            throw error
        }
        return  updated
    }
}

