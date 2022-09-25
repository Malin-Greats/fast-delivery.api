import { IPassword } from "../domain/dto/auth/change-pwd.dto";
import { IProfilePhoto } from "../domain/dto/profile/profile.dto";
import { UserIn } from "../domain/dto/user/user.dto";
import { Role } from "../domain/role.model";
import { User } from "../domain/user.model";

export interface IUserRepository{
    create(userIn:UserIn, userRole:Role):Promise<User>
    update(userId:string, userIn:UserIn|IPassword|IProfilePhoto):Promise<User>
    delete(userId:string):Promise<User>
    findById(userId:string):Promise<User>
    findByEmail(email:string):Promise<User>
    findAll(filterBy:string):Promise<User[]>
    findByContact(contact: string):Promise<User>
}