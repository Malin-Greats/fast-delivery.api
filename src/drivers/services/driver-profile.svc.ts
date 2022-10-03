import { ChangePasswordIn, IPassword } from "../../auth/domain/dto/auth/change-pwd.dto"
import { Hashing as hash, verifyPassword } from "../../shared/hashing"
import AppError from "../../shared/errors/error"
import { IUserProfileSvc } from "../../shared/ports/profile.port"
import { DriverProfile, toDriverProfile } from "../domain/dto/driver-profile.dto"
import { IDriverRepository } from "../ports/driver-repository.port"

export class DriverProfileSvc implements IUserProfileSvc<DriverProfile> {

    constructor(private _driverRepo:IDriverRepository){}

    async getProfile(userId:string): Promise<DriverProfile> {
        const user = await this._driverRepo.findById(userId)
        const profile= toDriverProfile(user)
        return profile
    }

    async editProfile(userId:string, profile: DriverProfile): Promise<DriverProfile> {
        const user = await this._driverRepo.update(userId, {by:profile})
        const updateProfile= toDriverProfile(user)
        return updateProfile
    }
    
    async changePassword(userId:string, pwdIn: ChangePasswordIn): Promise<string> {
        const customer =await this._driverRepo.findById(userId)
        let message!:string
        try {
             await verifyPassword(pwdIn.old_password, customer.password)
            const newPasswordHashed =await hash.Hash(pwdIn.new_password)
            await this._driverRepo.update(customer.id, {by:<IPassword>{password:newPasswordHashed}})

            if(!message){
                message="Password changed successfully."
            }

        } catch (error) {
            throw error
        }
        return message
    }

    async addProfilePhoto(userId:string,photo:{profile_photo:string}):Promise<string | undefined>{
        let user =await this._driverRepo.findById(userId)
        try {
            user =await this._driverRepo.update(user.id, {by:photo})

        } catch (error) {
            const err= new AppError("SERVER_ERROR:Error occured while updating ")
        }
        return  user.profile_photo
    }

}