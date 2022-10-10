import { ChangePasswordIn, IPassword } from "../../auth/domain/dto/auth/change-pwd.dto"
import { CustomerProfile, toCustomerProfile } from "../domain/dto/customer-profile"
import { Hashing as hash, verifyPassword } from "../../shared/hashing"
import { ICustomerRepo } from "../ports/customer-repo.port"
import AppError from "../../shared/errors/error"
import { IUserProfileSvc } from "../../shared/ports/profile.port"
import { ProfilePhotoIn, ProfilePhotoOut } from "../../shared/dto/profile_photo.dto"

export class CustomerProfileSvc  implements IUserProfileSvc<CustomerProfile> {

    constructor(private _customerRepo:ICustomerRepo){}

    async getProfile(userId:string): Promise<CustomerProfile> {
        const customer = await this._customerRepo.findById(userId)
        const profile= toCustomerProfile(customer)
        return profile
    }

    async editProfile(userId:string, profile: CustomerProfile): Promise<CustomerProfile> {
        const customer = await this._customerRepo.update(userId, {by:profile})
        const updateProfile= toCustomerProfile(customer)
        return updateProfile
    }

    async changePassword(userId:string, pwdIn: ChangePasswordIn): Promise<string> {
        const customer =await this._customerRepo.findById(userId)
        let message!:string
        try {
             await verifyPassword(pwdIn.old_password, customer.password)
            const newPasswordHashed =await hash.Hash(pwdIn.new_password)
            const passwordIn:IPassword ={password:newPasswordHashed}
            await this._customerRepo.update(customer.id, {by:passwordIn})
            if(!message){
                message="Password changed successfully."
            }

        } catch (error) {
            throw error
        }
        return message
    }

    async addProfilePhoto(userId:string,{profile_photo}:ProfilePhotoIn):Promise<ProfilePhotoOut>{
        let customer =await this._customerRepo.findById(userId)
        const profilePhoto =<ProfilePhotoOut> {new_profile_photo:profile_photo, old_profile_photo:customer.profile_photo}
        try {
            customer =await this._customerRepo.update(customer.id, {by:{profile_photo}})

        } catch (error) {
            const err= new AppError("SERVER_ERROR:Error occured while updating ")
        }
        return  profilePhoto
    }

}