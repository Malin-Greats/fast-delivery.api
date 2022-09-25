import logger from "../../shared/errors/logger";
import { UserIn, UserOut, toUserOut } from "../domain/dto/user/user.dto";
import { IRoleRepository } from "../ports/role-repository.port";
import { IUserRepository } from "../ports/user-repository.port";
import { IUserService } from "../ports/user-service.port";

export class UserService implements IUserService{

    constructor(private _userRepository:IUserRepository, private _roleRepository:IRoleRepository){}

    async createUser(userIn: UserIn): Promise<UserOut> {
        const userRole= await this._roleRepository.findByName(userIn.role)
        const user= await this._userRepository.create(userIn, userRole)
        const userOut= toUserOut(user,user.role.name)
        return userOut
    }
    async updateUser(userId: string, userIn: UserIn): Promise<UserOut> {
        const user= await this._userRepository.update(userId, userIn)
        const userOut= toUserOut(user,user.role.name)
        return userOut
    }
    async deleteUser(userId: string): Promise<UserOut> {
        const user= await this._userRepository.delete(userId)
        const userOut= toUserOut(user,user.role.name)
        return userOut
    }
    async findUserById(userId: string): Promise<UserOut> {
        const user= await this._userRepository.findById(userId)
        const userOut= toUserOut(user,user.role.name)
        return userOut
    }
    async findUserByEmail(email: string): Promise<UserOut> {
        const user= await this._userRepository.findByEmail(email)
        const userOut= toUserOut(user,user.role.name)
        return userOut
    }
    async findAllUsers(filterBy: string): Promise<UserOut[]> {
        const users= await this._userRepository.findAll(filterBy)
        let usersOut:UserOut[]=[];
        for (let user of users){
            const userOut= toUserOut(user,user.role.name)
            logger.info(userOut)
            usersOut.push(userOut)
        }
        return usersOut
    }
    async findUserByContact(contact: string): Promise<UserOut> {
        const user= await this._userRepository.findByContact(contact)
        const userOut= toUserOut(user,user.role.name)
        return userOut
    }
    
}