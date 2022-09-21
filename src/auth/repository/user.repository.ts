import { Repository } from "typeorm";
import AppError from "../../common/errors/appErrors";
import { psqlDB } from "../../data-source";
import {  toNewUser, User } from "../domain/user.model";
import { UserIn } from "../dto/user/create-user.dto";
import { IUserRepository } from "../ports/user-repositoty.port";

export class UserRepository implements IUserRepository{


    constructor(private ormRepository: Repository<User>){}

    async create(userRequest: UserIn):Promise<User>{
        const newUser=toNewUser(userRequest)
        const user = await this.ormRepository.create(newUser);
        let savedUser=await this.ormRepository.save(user)
        return savedUser
    }

    async findAll(): Promise<User[]> {
        let users!:User[]
        try {
             users =await this.ormRepository.find()
        } catch (error) {
            console.log(error)
            throw  error
        }
        return users
    }

    async findById(userId: string):Promise<User>{
        const user  = await this.ormRepository.findOneOrFail({ where: { ID:userId }})
        if (!user) {
            throw new AppError(`The user with id: ${userId} does not exist!`);
          }
        return  user
    }

    async delete(userId:string):Promise<boolean>{
        const user = await this.ormRepository.findOneOrFail({ where: { ID:userId }});
        if (!user) {
            throw new AppError(`The user with id: ${userId} does not exist!`);
        }
        await this.ormRepository.remove(user);
        return true;
    }

    async findByEmail(email: string):Promise<User>{
        const user  = await this.ormRepository.findOneOrFail({ where: { email }})
        if (!user) {
            throw new AppError(`The user with email: ${email} does not exist!`);
          }
        return  user
    }

    async findByContact(contact: string):Promise<User>{
        const user  = await this.ormRepository.findOneOrFail({ where: { contact }})
        if (!user) {
            throw new AppError(`The user with contact: ${contact} does not exist!`);
          }
        return  user
    }

    async update(userId:string, userRequest:UserIn):Promise<User>{
        const user = await this.ormRepository.findOneOrFail({ where: { ID:userId }});
        if (!user) {
            throw new AppError(`The user with id: ${userId} does not exist!`);
        }
        Object.assign(user, userRequest);
        const updatedUser=await this.ormRepository.save(user);
        return  updatedUser
    }
}
