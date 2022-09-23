import AppError from "../../shared/errors/error";
import { Hashing as hash } from "../../shared/hashing";
import { jwt } from "../../shared/jwt.util";
import { IJWTPayload } from "../dto/auth/jwt.dto";
import { LoginIn, LoginOut } from "../dto/auth/login.dto";
import { OTPIn, OTPOut } from "../dto/auth/otp.dto";
import { UserIn } from "../dto/user/create-user.dto";
import { toUserOut, UserOut } from "../dto/user/get-user.dto";
import { IAuthService } from "../ports/auth-service.port";
import { IRoleRepository } from "../ports/role-repository.port";
import { IUserRepository } from "../ports/user-repository.port";

export class AuthService implements IAuthService{

    constructor(private _userRepository:IUserRepository, private _roleRepository:IRoleRepository){}

    async signUp(userIn: UserIn): Promise<UserOut> {
        const passwordHashed = await hash.Hash(userIn.password)
        userIn.password=passwordHashed
        const userRole= await this._roleRepository.findByName(userIn.role)
        const user= await this._userRepository.create(userIn, userRole)
        return toUserOut(user, user.role.name)
    }
    async login(loginIn: LoginIn): Promise<LoginOut> {
        const user = await this._userRepository.findByEmail(loginIn.email)
        await this.verifyPassword(loginIn.password,user.password)
        const payload =<IJWTPayload>{userId:user.id, role:user.role.name}
        const token = await jwt.generateToken(payload)
        const userOut= toUserOut(user, user.role.name)
        const result:LoginOut = {user:userOut, token:token}
        return result
    }
    verifyOTP(otpIn: OTPIn): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    requestOTP(userId: string): Promise<OTPOut> {
        throw new Error("Method not implemented.");
    }
    resetPassord(email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    private async verifyPassword(password:string, hashedPassword:string):Promise<void>{
       try {
            await hash.CheckHash(password, hashedPassword);
       } catch (error) {
            throw new AppError("Invalid password. Please try again!")
       }
    }

}