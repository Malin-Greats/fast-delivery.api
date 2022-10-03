import { LoginIn, LoginOut } from "../domain/dto/auth/login.dto"
import { OTPIn, OTPOut } from "../domain/dto/auth/otp.dto"
export interface IAuthService<T, R>{
    signUp(userIn:T):Promise<R>
    login(loginIn:LoginIn):Promise<LoginOut<R>>
    verifyOTP(otpIn:OTPIn):Promise<boolean>
    requestOTP(userId:string):Promise<OTPOut>
    resetPassword(email:string):Promise<boolean>
}