import { ChangePasswordIn, IPassword } from "../../auth/domain/dto/auth/change-pwd.dto"
import { Hashing as hash } from "../../shared/hashing"
import AppError from "../../shared/errors/error"
import { IUserProfileSvc } from "../../shared/ports/profile.port"
import { Admin } from "../domain/admin.model"
import { IAdminRepository } from "../ports/admin-repository.port"
import { AdminOut, toAdminOut } from "../domain/dto/admin.dto"

export class AdminProfileSvc  implements IUserProfileSvc<AdminOut> {

    constructor(private _adminRepo:IAdminRepository){}

    async getProfile(userId:string): Promise<AdminOut> {
        const admin = await this._adminRepo.findById(userId)
        const adminOut=toAdminOut(admin,admin.role.name )
        return adminOut
    }

    async editProfile(userId:string, profile: AdminOut): Promise<AdminOut> {
        const updatedAdmin = await this._adminRepo.update(userId, {by:profile})
        const adminOut=toAdminOut(updatedAdmin,updatedAdmin.role.name )
        return adminOut
    }
    
    async changePassword(userId:string, pwdIn: ChangePasswordIn): Promise<boolean> {
        const admin =await this._adminRepo.findById(userId)
        try {
            await  hash.CheckHash(pwdIn.old_password, admin.password)
            const newPasswordHashed =await hash.Hash(pwdIn.new_password)
            const passwordIn:IPassword ={password:newPasswordHashed}
            await this._adminRepo.update(admin.id, {by:passwordIn})

        } catch (error) {
            throw new AppError("Old password is invalid")
        }
        return true
    }

    async addProfilePhoto(userId:string,photo:{profile_photo:string}):Promise<string | undefined>{
        let admin =await this._adminRepo.findById(userId)
        try {
            admin =await this._adminRepo.update(admin.id, {by:photo})

        } catch (error) {
            const err= new AppError("SERVER_ERROR:Error occured while updating ")
        }
        return  admin.profile_photo
    }

}