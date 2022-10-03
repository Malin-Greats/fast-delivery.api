import { IObject } from "../../shared/dto/filter-by.dto"
import { IEmail } from "../../shared/types/email.type"
import { IPhoneNumber } from "../../shared/types/phone.type"
import { CustomerIn, CustomerOut } from "../domain/dto/customer.dto"

export interface  ICustomerSvc{
    create(customerIn:CustomerIn):Promise<CustomerOut>
    delete(id:string):Promise<CustomerOut>
    findById(id:string):Promise<CustomerOut>
    findByEmail(email:IEmail):Promise<CustomerOut>
    findByPhone(phone:IPhoneNumber):Promise<CustomerOut>
    findAll(filter: IObject|null): Promise<CustomerOut[]>
    update(id:string,customerIn:CustomerIn):Promise<CustomerOut>
}