import express, {Request, Response} from "express"
import { UserIn } from "../dto/user/create-user.dto";
import { UserOut } from "../dto/user/get-user.dto";
import { IUserService } from "../ports/user-service.port";

export class UserHandler{
    constructor(private _userService:IUserService){}

    async getUserById(req:Request, res:Response){
        let userId:string=req.params.userId
        let response!:UserOut
        try {
            response= await  this._userService.findUserById(userId)
        } catch (error) {
            return res.status(400).send(error)
        }
         return res.status(201).json(response)
    }

    async getAllUsers(eq:Request, res:Response){
        let users!:UserOut[]
        try {
            users=await this._userService.findAllUsers()
        } catch (error) {
            return res.status(500).send(error)
        }
         return res.status(201).json(users)
    }
    async updateUser(req:Request, res:Response){
        let userId=req.params.userId
        let userIn=<UserIn>req.body
        let response!:UserOut
        try {
            response=  await this._userService.updateUser(userId,userIn)
        } catch (error) {
            return res.status(400).send(error)
        }
        return res.status(201).json(response)
    }
    async deleteUser(req:Request, res:Response){
        let userId=req.params.userId
         try {
              await this._userService.deleteUser(userId)
         } catch (error) {
             return res.status(400).send(error)
         }
         return res.sendStatus(204)
    }
    async userProfile(req:Request, res:Response){
        const token =req.get('Authorization')
        if(!token){
            return res.sendStatus(401)
        }
        let response!:UserOut
        try {
            response = await this._userService.userProfile(token)
        } catch (error) {
            return res.status(400).send(error)
        }
        return res.status(200).json(response)
    }
}