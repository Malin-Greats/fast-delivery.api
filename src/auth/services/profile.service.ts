import AppError from "../../shared/errors/error";
import { Hashing as hash } from "../../shared/hashing";
import { jwt, Payload } from "../../shared/jwt.util";
import { ChangePasswordIn, IPassword } from "../domain/dto/auth/change-pwd.dto";
import { IProfilePhoto, IUserProfile, toUserProfile } from "../domain/dto/profile/profile.dto";
import { UserIn } from "../domain/dto/user/user.dto";
import { IProfileService } from "../ports/profile-service.port";
import { IUserRepository } from "../ports/user-repository.port";


export class ProfileService implements IProfileService {

    constructor(private _userRepository:IUserRepository){}

    async getProfile(token: string): Promise<IUserProfile> {
        const payload = await  jwt.verifyToken(token) 
        const user = await this._userRepository.findById(payload.userId)
        const userProfile= toUserProfile(user)
        return userProfile
    }

    async editProfile(token: string, profile: IUserProfile): Promise<IUserProfile> {
        const payload = await  jwt.verifyToken(token) 
        const updateRequest=profile as UserIn
        const user = await this._userRepository.update(payload.userId, updateRequest)
        const userProfile= toUserProfile(user)
        return userProfile
    }
    
    async changePassword(token:string, pwdIn: ChangePasswordIn): Promise<boolean> {
        const payload = await  jwt.verifyToken(token) 
        const user =await this._userRepository.findById(payload.userId)
        try {
            await  hash.CheckHash(pwdIn.old_password, user.password)
            const newPasswordHashed =await hash.Hash(pwdIn.new_password)
            const passwordIn:IPassword ={password:newPasswordHashed}
            await this._userRepository.update(user.id, passwordIn)

        } catch (error) {
            throw new AppError("Old password is invalid")
        }
        return true
    }

    async addProfilePhoto(token:string,photoPhoto:IProfilePhoto):Promise<string | undefined>{
        const payload = await  jwt.verifyToken(token)
        let user =await this._userRepository.findById(payload.userId)

        try {
            user =await this._userRepository.update(user.id, photoPhoto)

        } catch (error) {
            const err= new AppError("SERVER_ERROR:Error occured while updating ")
        }
        return  user.profile_photo
    }

}