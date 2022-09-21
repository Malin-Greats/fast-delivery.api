import { UserIn } from "../dto/user/create-user.dto";
import { UserOut } from "../dto/user/get-user.dto";

export interface IUserService{
    updateUser(userId:string, userInput:UserIn,):Promise<UserOut>
    findUserById(userId:string):Promise<UserOut>
    findUserEmail(email:string):Promise<UserOut>
    findUserByContact(contact:string):Promise<UserOut>
    deleteUser(userId:string):Promise<boolean>
    findAllUsers():Promise<UserOut[]>
    userProfile(token:string): Promise<UserOut>
}