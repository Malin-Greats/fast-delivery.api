import { ChangePasswordIn } from "../dto/auth/change-pwd.dto";
import { IProfile } from "../dto/profile/profile.dto";

export interface IProfileService {
    getProfile(token:string):Promise<IProfile>
    editProfile(token:string, profile:IProfile):Promise<IProfile>
    changePassword(pwdIn:ChangePasswordIn):Promise<boolean>
}