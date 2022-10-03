import { LoginIn, LoginOut } from "../../auth/domain/dto/auth/login.dto"
import { jwt } from "../../shared/jwt.util"
import { verifyPassword} from "../../shared/hashing"
import AppError from "../../shared/errors/error"
import { IAuthService } from "../../auth/ports/auth-service.port"
import { OTPIn, OTPOut } from "../../auth/domain/dto/auth/otp.dto"
import { IRoleRepository } from "../../auth/ports/role-repository.port"
import { AdminIn, AdminOut, toAdminOut } from "../domain/dto/admin.dto"
import { IAdminRepository } from "../ports/admin-repository.port"
import { EntityNotFoundError } from "typeorm"

export class AdminAuthSvc implements IAuthService<AdminIn, AdminOut>{

    constructor(private _adminRepo:IAdminRepository, private _roleRepo:IRoleRepository){}


    async login({phone_number, password}: LoginIn): Promise<LoginOut<AdminOut>> {
        let user  = await this.findByContact(phone_number)
        await verifyPassword(password, user.password)
        const token = await jwt.generateToken({userId:user.id, role:user.role.name})
        const profile= toAdminOut(user, user.role.name)
        const result = <LoginOut<AdminOut>>{user:profile, token:token}
        return result
    }

    async signUp(customerIn: AdminIn): Promise<AdminOut> {
        const role= await this._roleRepo.findByName(customerIn.role)
        const user= await this._adminRepo.save(customerIn, role)
        const userOut= toAdminOut(user, user.role.name)
        return userOut
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
            user =await this._adminRepo.findBy({by:{phone_number}})
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