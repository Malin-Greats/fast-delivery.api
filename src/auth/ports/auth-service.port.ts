import { LoginIn, LoginOut } from "../dto/auth/login.dto"
import { OTPIn, OTPOut } from "../dto/auth/otp.dto"
import { UserIn } from "../dto/user/create-user.dto"
import { UserOut } from "../dto/user/get-user.dto"
export interface IAuthService{
    signUp(userIn:UserIn):Promise<UserOut>
    login(loginIn:LoginIn):Promise<LoginOut>
    verifyOTP(otpIn:OTPIn):Promise<boolean>
    requestOTP(userId:string):Promise<OTPOut>
    resetPassord(email:string):Promise<boolean>
}