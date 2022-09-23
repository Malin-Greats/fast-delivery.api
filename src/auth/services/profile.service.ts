import { jwt, Payload } from "../../shared/jwt.util";
import { ChangePasswordIn } from "../dto/auth/change-pwd.dto";
import { IProfile, toUserProfile } from "../dto/profile/profile.dto";
import { UserIn } from "../dto/user/create-user.dto";
import { IProfileService } from "../ports/profile-service.port";
import { IUserRepository } from "../ports/user-repository.port";

export class ProfileService implements IProfileService{

    constructor(private _userRepository:IUserRepository){}

    async getProfile(token: string): Promise<IProfile> {
        const payload = await  jwt.verifyToken(token) 
        const user = await this._userRepository.findById(payload.userId)
        const userProfile= toUserProfile(user)
        console.log(userProfile)
        return userProfile
    }
    async editProfile(token: string, profile: IProfile): Promise<IProfile> {
        const payload = await  jwt.verifyToken(token) 
        const updateRequest=profile as UserIn
        const user = await this._userRepository.update(payload.userId, updateRequest)
        const userProfile= toUserProfile(user)
        return userProfile
    }
    
    async changePassword(pwdIn: ChangePasswordIn): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    
}