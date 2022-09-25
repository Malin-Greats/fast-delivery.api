import { LoginIn, LoginOut } from "../domain/dto/auth/login.dto"
import { OTPIn, OTPOut } from "../domain/dto/auth/otp.dto"
import { UserIn, UserOut } from "../domain/dto/user/user.dto"
export interface IAuthService{
    signUp(userIn:UserIn):Promise<UserOut>
    login(loginIn:LoginIn):Promise<LoginOut>
    verifyOTP(otpIn:OTPIn):Promise<boolean>
    requestOTP(userId:string):Promise<OTPOut>
    resetPassord(email:string):Promise<boolean>
}