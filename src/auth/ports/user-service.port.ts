import { UserIn } from "../dto/user/create-user.dto"
import { UserOut } from "../dto/user/get-user.dto"

export interface IUserService{
        createUser(userIn:UserIn):Promise<UserOut>
        updateUser(userId:string, userIn:UserIn):Promise<UserOut>
        deleteUser(userId:string):Promise<UserOut>
        findUserById(userId:string):Promise<UserOut>
        findUserByEmail(email:string):Promise<UserOut>
        findAllUsers(filterBy:string):Promise<UserOut[]>
        findUserByContact(contact: string):Promise<UserOut>
}