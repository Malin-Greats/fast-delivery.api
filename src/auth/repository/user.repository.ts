import { EntityNotFoundError, Repository } from "typeorm";
import AppError from "../../shared/errors/error";
import logger from "../../shared/errors/logger";
import { toNewUser, User } from "../domain/user.model";
import { UserIn } from "../dto/user/create-user.dto";
import { IUserRepository } from "../ports/user-repository.port";
import { Hashing as  hash } from "../../shared/hashing";
import { Role } from "../domain/role.model";
export class UserRepository implements IUserRepository{

    constructor(private ormRepository:Repository<User>){}

    async create(userIn: UserIn, userRole:Role): Promise<User> {
        const newUser = toNewUser(userIn);
         newUser.role = userRole
        const user = await this.ormRepository.create(newUser);

        let savedUser!:User
        try {
            savedUser=await this.ormRepository.save(user)
        } catch (error ) {
            logger.error(error)
            throw error
        }
        return savedUser
    }

    async update(userId: string, userIn: UserIn): Promise<User> {
        const user = await this.findById(userId);

        Object.assign(user, userIn);
        let updatedUser!:User
        try {
            updatedUser=await this.ormRepository.save(user);
        } catch (error) {
            logger.error(error)
            throw error
        }
        return  updatedUser
    }

    async delete(userId: string): Promise<User> {
        const user = await this.findById(userId);
        let removedUser!:User;
        try {
            removedUser=await this.ormRepository.remove(user);
        } catch (error) {
            logger.error(error)
            throw error
        }
        return removedUser;
    }

    async findById(userId: string): Promise<User> {
        let user!:User;
        try {
            user =  await this.ormRepository.findOneOrFail({ 
                where: { id:userId },
                relations: {role: true,}
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The user with id: ${userId} does not exist!`);
            }else{
                logger.error(error)
                throw error
            }
        }
        return  user
    }

    async findByEmail(email: string): Promise<User> {
        let user!:User;
        try {
            user = await this.ormRepository.findOneOrFail({
                 where: { email }, 
                 relations: {role: true,}
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The user with email: ${email} does not exist!`);
            }else{
                throw error
            }
        } 
        return  user
    }

    async findAll(filterBy: string): Promise<User[]> {
        let users!:User[]
        try {
            users =await this.ormRepository.find({
                relations: {role: true}
            })

        } catch (error) {
            logger.error(error)
            throw  error
        }
        return users
    }

    async findByContact(contact: string):Promise<User>{
        let user!:User;
        try {
            user = await this.ormRepository.findOneOrFail({ 
                where: { contact },
                relations: {role: true,}
            })
        } catch (error) {
            if (error instanceof EntityNotFoundError){
                throw new AppError(`The user with contact: ${contact} does not exist!`);
            }else{
                logger.error(error)
                throw error
            }
        } 
        return  user
    }

    

}

