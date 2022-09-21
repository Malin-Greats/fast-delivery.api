import { jwt, Payload } from '../../common/_helpers/jwt.util';
import { Role } from '../domain/role.model';
import { User } from '../domain/user.model';
import { UserIn } from '../dto/user/create-user.dto';
import { toUserOut, UserOut } from '../dto/user/get-user.dto';
import { IRoleRepository } from '../ports/role-repository.port';
import { IUserRepository } from '../ports/user-repositoty.port';
import { IUserService } from'../ports/user-service.port';


export class UserService implements  IUserService{

    constructor(private _userRepo:IUserRepository, private _roleRepo:IRoleRepository){}

   async updateUser(userId: string, userInput: UserIn): Promise<UserOut> {
        const role =await this.getRole(userInput.roleId)
        const user= await this._userRepo.update(userId, userInput)
        let userOut = toUserOut(user, role.name)
        return  userOut
    }

    async findUserById(userId: string): Promise<UserOut> {
       const user= await this._userRepo.findById(userId)
       const role =await this.getRole(user.roleId)
       const userOut = toUserOut(user, role.name)
       return userOut
    }

    async findUserEmail(email: string): Promise<UserOut> {
       const user = await this._userRepo.findByEmail(email)
       const role =await this.getRole(user.roleId)
       const userOut = toUserOut(user, role.name)
       return userOut
    }
    async findUserByContact(contact: string): Promise<UserOut> {
        let  user = await this._userRepo.findByContact(contact)
        const role =await this.getRole(user.roleId)
        let userOut = toUserOut(user, role.name)
        return userOut

    }
    async deleteUser(userId: string): Promise<boolean> {
        return await this._userRepo.delete(userId)
    }

    async findAllUsers(): Promise<UserOut[]> {
        let usersOut:UserOut[]=[]
        const users:User[]=await this._userRepo.findAll()
        for (let user of users){
            const role =await this.getRole(user.roleId)
            let userOut = toUserOut(user, role.name)
            usersOut.push(userOut)
        }
        return usersOut
    }
    async getRole(roleId:string):Promise<Role>{
        const role=await this._roleRepo.findById(roleId)
        return role
    }
    async userProfile(token:string): Promise<UserOut>{
        const payload= <Payload>jwt.verifyToken(token) 
        const userOut = await this.findUserById(payload.userId)
        return userOut
    }

}