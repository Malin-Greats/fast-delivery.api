import { IRoleRepository } from "../../auth/ports/role-repository.port"
import { IObject } from "../../shared/dto/filter-by.dto"
import { IEmail } from "../../shared/types/email.type"
import { IPhoneNumber } from "../../shared/types/phone.type"
import { CustomerIn, CustomerOut, toCustomerOut } from "../domain/dto/customer.dto"
import { ICustomerRepo } from "../ports/customer-repo.port"
import { ICustomerSvc} from "../ports/customer-svc.port"

export class CustomerSvc implements ICustomerSvc{

    constructor(private _customerRepo:ICustomerRepo, private _roleRepository:IRoleRepository){}

    async create(customerIn: CustomerIn): Promise<CustomerOut> {
        const role= await this._roleRepository.findByName(customerIn.role)
        const user= await this._customerRepo.save(customerIn, role)
        const customerOut= toCustomerOut(user,user.role.name)
        return customerOut
    }

    async delete(id: string): Promise<CustomerOut> {
        const user= await this._customerRepo.delete(id)
        const customerOut= toCustomerOut(user,user.role.name)
        return customerOut
    }

    async findById(id: string): Promise<CustomerOut> {
        const user= await this._customerRepo.findById(id)
        const customerOut= toCustomerOut(user,user.role.name)
        return customerOut
    }

    async findByEmail(email: IEmail): Promise<CustomerOut> {
        const user= await this._customerRepo.findBy({by:email})
        const customerOut= toCustomerOut(user,user.role.name)
        return customerOut
    }

    async findByPhone(phone:IPhoneNumber): Promise<CustomerOut> {
        const user= await this._customerRepo.findBy({by:phone})
        const customerOut= toCustomerOut(user,user.role.name)
        return customerOut
    }

    async findAll(filter: IObject|null): Promise<CustomerOut[]> {
        const users= await this._customerRepo.findAll()
        let usersOut:CustomerOut[]=[];
        for (let user of users){
            const userOut= toCustomerOut(user,user.role.name)
            usersOut.push(userOut)
        }
        return usersOut
    }

    async update(id: string, customerIn: CustomerIn): Promise<CustomerOut> {
        const user= await this._customerRepo.update(id, {by:customerIn})
        const userOut= toCustomerOut(user,user.role.name)
        return userOut
    }
   
 
}