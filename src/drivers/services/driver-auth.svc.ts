import { LoginIn, LoginOut } from "../../auth/domain/dto/auth/login.dto"
import { jwt } from "../../shared/jwt.util"
import { IDriverRepository } from "../ports/driver-repository.port"
import { verifyPassword } from "../../shared/hashing"
import AppError from "../../shared/errors/error"
import { DriverProfile, toDriverProfile } from "../domain/dto/driver-profile.dto"
import { IAuthService } from "../../auth/ports/auth-service.port"
import { OTPIn, OTPOut } from "../../auth/domain/dto/auth/otp.dto"
import { IRoleRepository } from "../../auth/ports/role-repository.port"
import { EntityNotFoundError } from "typeorm"
import { DriverIn } from "../domain/dto/driver.dto"

export class DriverAuthSvc implements IAuthService<DriverIn, DriverProfile>{

    constructor(private _driverRepo:IDriverRepository, private _roleRepo:IRoleRepository){}
 

    async login({phone_number, password}: LoginIn): Promise<LoginOut<DriverProfile>> {
          let customer  = await this.findByContact(phone_number)
          await verifyPassword(password, customer.password)
          const token = await jwt.generateToken({userId:customer.id, role:customer.role.name})
          const profile= toDriverProfile(customer)
          const result = <LoginOut<DriverProfile>>{user:profile, token:token}
          return result
     }

     async signUp(driverIn: DriverIn): Promise<DriverProfile> {
          const role= await this._roleRepo.findByName(driverIn.role)
          const user= await this._driverRepo.save(driverIn, role)
          const customerOut= toDriverProfile(user)
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
          let user;
          try {
               user =await this._driverRepo.findBy({by:{phone_number}})
          } catch (error) {
          if (error instanceof EntityNotFoundError){
               throw new AppError(`Invalid credentials.Please, try again!`);
          }else{
               throw error
          }
          }
          return user
     }

}