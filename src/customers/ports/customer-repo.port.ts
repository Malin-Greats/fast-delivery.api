import { Role } from "../../auth/domain/role.model";
import { IObject } from "../../shared/dto/filter-by.dto";
import { Customer } from "../domain/customer.model";
import { CustomerIn } from "../domain/dto/customer.dto";

export interface  ICustomerRepo{
    save(customerIn:CustomerIn,  role:Role):Promise<Customer>
    delete(id:string):Promise<Customer>
    findById(id:string):Promise<Customer>
    findBy(filter:IObject):Promise<Customer>
    findAll():Promise<Customer[]>
    update(id:string , filter:IObject):Promise<Customer>
}