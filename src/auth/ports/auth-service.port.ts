import { ChangePasswordIn } from "../dto/auth/change-pwd.dto";
import { LoginIn, LoginOut } from "../dto/auth/login.dto";
import { UserIn } from "../dto/user/create-user.dto";
import { UserOut } from "../dto/user/get-user.dto";

export interface IAuthService{
    signUp(userIn:UserIn):Promise<UserOut>
    loginUser(loginIn: LoginIn):Promise<LoginOut>
    changePassword(pwdRequest: ChangePasswordIn):Promise<boolean>
    // requestOTP(userId: string):Promise<string>
    // verifyUser(otpIn:OtpIn):Promise<boolean>
}