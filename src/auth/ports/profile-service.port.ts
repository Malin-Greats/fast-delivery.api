import { ChangePasswordIn } from "../domain/dto/auth/change-pwd.dto";
import { IProfilePhoto, IUserProfile } from "../domain/dto/profile/profile.dto";

export interface IProfileService {
    getProfile(token:string):Promise<IUserProfile>
    editProfile(token:string, profile:IUserProfile):Promise<IUserProfile>
    changePassword(token:string, pwdIn: ChangePasswordIn): Promise<boolean>
    addProfilePhoto(token:string,photoPhoto:IProfilePhoto):Promise<string|undefined>
}