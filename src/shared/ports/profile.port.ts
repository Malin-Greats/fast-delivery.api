import { ChangePasswordIn } from "../../auth/domain/dto/auth/change-pwd.dto"
import { ProfilePhotoIn, ProfilePhotoOut } from "../dto/profile_photo.dto"

export interface IUserProfileSvc<T > {
     getProfile(userId:string): Promise<T>
     editProfile(userId:string, profile: T): Promise<T> 
     changePassword(userId:string, pwdIn: ChangePasswordIn): Promise<string> 
     addProfilePhoto(userId:string,photo:ProfilePhotoIn):Promise<ProfilePhotoOut>
}