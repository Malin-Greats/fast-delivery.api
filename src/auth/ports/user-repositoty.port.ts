import { User } from "../domain/user.model";
import { UserIn } from "../dto/user/create-user.dto";


export interface IUserRepository{
    create(userRequest:UserIn):Promise<User>
    findAll():Promise<User[]>
    findById(userId: string ):Promise<User>
    findByEmail(email: string ):Promise<User>
    findByContact(contact: string):Promise<User>
    delete(userId: string ):Promise<boolean>
    update(userId: string , userRequest:UserIn):Promise<User>
}