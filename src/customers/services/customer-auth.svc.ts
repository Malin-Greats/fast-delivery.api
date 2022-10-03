import { LoginIn, LoginOut } from "../../auth/domain/dto/auth/login.dto"
import { jwt } from "../../shared/jwt.util"
import { CustomerProfile, toCustomerProfile } from "../domain/dto/customer-profile"
import { ICustomerRepo } from "../ports/customer-repo.port"
import { verifyPassword } from "../../shared/hashing"
import AppError from "../../shared/errors/error"
import { IAuthService } from "../../auth/ports/auth-service.port"
import { CustomerIn, } from "../domain/dto/customer.dto"
import { OTPIn, OTPOut } from "../../auth/domain/dto/auth/otp.dto"
import { IRoleRepository } from "../../auth/ports/role-repository.port"
import { EntityNotFoundError } from "typeorm"

export class CustomerAuthSvc implements IAuthService<CustomerIn, CustomerProfile>{

    constructor(private _customerRepo:ICustomerRepo, private _roleRepo:IRoleRepository){}

    async login({phone_number, password}: LoginIn): Promise<LoginOut<CustomerProfile>> {
        let customer  = await this.findByContact(phone_number)
        await verifyPassword(password, customer.password)
        const token = await jwt.generateToken({userId:customer.id, role:customer.role.name})
        const profile= toCustomerProfile(customer)
        const result = <LoginOut<CustomerProfile>>{user:profile, token:token}
        return result
    }

    async signUp(customerIn: CustomerIn): Promise<CustomerProfile> {
        const role= await this._roleRepo.findByName(customerIn.role)
        const user= await this._customerRepo.save(customerIn, role)
        const customerOut= toCustomerProfile(user)
        return customerOut
    }

    verifyOTP(otpIn: OTPIn): Promise<boolean> {
        throw new Error("Method not implemented.")
    }

    requestOTP(userId: string): Promise<OTPOut> {
        throw new Error("Method not implemented.")
    }

    resetPassword(email: string): Promise<boolean> {
        throw new Error("Method not implemented.")
    }

    private  async findByContact(phone_number:string){
        let customer;
        try {
            customer =await this._customerRepo.findBy({by:{phone_number}})
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`Invalid credentials.Please, try again!`);
            }else{
                throw error
            }
        }
        return customer

    }

    

}