import { ChangePasswordIn } from "../../auth/domain/dto/auth/change-pwd.dto"

export interface IUserProfileSvc<T > {
     getProfile(userId:string): Promise<T>
     editProfile(userId:string, profile: T): Promise<T> 
     changePassword(userId:string, pwdIn: ChangePasswordIn): Promise<string> 
     addProfilePhoto(userId:string,photo:{profile_photo:string}):Promise<string | undefined>
}