import AppError from "../../common/errors/appErrors";
import { jwt } from "../../common/_helpers/jwt.util";
import {  PasswordHashing as pwd} from "../../common/_helpers/passwordHash";
import { ChangePasswordIn } from "../dto/auth/change-pwd.dto";
import { IJWTPayload } from "../dto/auth/jwt.dto";
import { LoginIn, LoginOut } from "../dto/auth/login.dto";
import { UserIn } from "../dto/user/create-user.dto";
import { toUserOut, UserOut } from "../dto/user/get-user.dto";
import { IAuthService } from "../ports/auth-service.port";
import { IRoleRepository } from "../ports/role-repository.port";
import { IUserRepository } from "../ports/user-repositoty.port";

export class AuthService implements  IAuthService{

    constructor (private _userRepo:IUserRepository, private _roleRepo:IRoleRepository){
    }

    async signUp(userRequest: UserIn): Promise<UserOut> {
        const hashedPassword= await pwd.Hash(userRequest.password)
        userRequest.password=hashedPassword
        const user=await this._userRepo.create(userRequest)
        const userRole= await this._roleRepo.findById(user.roleId)
        return toUserOut(user, userRole.name)
    }


    async loginUser(loginIn: LoginIn): Promise<LoginOut> {
        const user = await this._userRepo.findByEmail(loginIn.email)
        if(!user){
            throw new AppError(`The use with email: ${loginIn.email} doesn't exist!`)
        }
        const isOldValid=await pwd.CheckHash(loginIn.password, user.password);
        if(!isOldValid){
            throw new AppError("Invalid password. Please try again!")
        }
        const userRole= await this._roleRepo.findById(user.roleId)
        const payload:IJWTPayload ={userId:user.ID, role:userRole.name}
        const token = jwt.generateToken(payload)
        const userOut= toUserOut(user, userRole.name)
        const result:LoginOut = {user:userOut, token:token}
        return result
    }

    // async verifyUser(otpIn: OtpIn): Promise<boolean> {
    //    const isVerified= await this._otpService.verifyOTP(otpIn);
    //     let result= false
    //    if (isVerified){
    //     let update ={isVerified:true} as UserIn
    //     this._userRepo.update(otpIn.userId, update)
    //     result=true
    //    }
    //    return result
    // }

    // async requestOTP(userId: string):Promise<string>{
    //   const otp =this._otpService.sendOTP(userId)
    //   return otp
    // }


    async changePassword(pwdRequest: ChangePasswordIn): Promise<boolean> {
        const user = await this._userRepo.findById(pwdRequest.userId)
        const isOldValid= await pwd.CheckHash(pwdRequest.oldPassword, user.password);
        if(!isOldValid){
            throw new AppError("Invalid old password doesn't. Please try again!")
        }
        const newHashedPassword = await pwd.Hash(pwdRequest.newPassword)
        // this._userRepo.update(user.ID, {password:newHashedPassword})
        return true
    }

}