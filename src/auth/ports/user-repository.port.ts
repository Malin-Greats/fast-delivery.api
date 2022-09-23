import { Role } from "../domain/role.model";
import { User } from "../domain/user.model";
import { UserIn } from "../dto/user/create-user.dto";
import { UserOut } from "../dto/user/get-user.dto";

export interface IUserRepository{
    create(userIn:UserIn, userRole:Role):Promise<User>
    update(userId:string, userIn:UserIn):Promise<User>
    delete(userId:string):Promise<User>
    findById(userId:string):Promise<User>
    findByEmail(email:string):Promise<User>
    findAll(filterBy:string):Promise<User[]>
    findByContact(contact: string):Promise<User>
}