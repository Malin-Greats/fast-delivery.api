import { IRoleService } from "../ports/role-service";
import {Request, Response} from "express"
import { validationResult } from "express-validator";
import { RoleIn } from "../dto/role/create-role.dto";
import { RoleOut } from "../dto/role/get-role.dto";
import AppError, { isError } from "../../shared/errors/error";
export class RoleHandler{
    constructor(private _roleService:IRoleService){}

    async createRole(req:Request, res:Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let request=<RoleIn>req.body
        let result!:RoleOut
        try {
             result=await this._roleService.createRole(request)
        } catch (error) {
            if (isError(error)){
               const err= new AppError(error.message,error.detail, 400)
                return res.status(err.statusCode).json(err)
            }
            return res.status(500).json(error)
        }
        return res.status(201).json(result)
    
    }

    async findRoleById(req:Request, res:Response){
       let roleId=<string>req.params.roleId
       let result
        try {
             result=await this._roleService.findRoleById(roleId)
        } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
         }
        return res.status(200).json(result)
    }

    async findRoleByName(req:Request, res:Response){
        let roleName:string=req.params.roleName
        let result
         try {
              result=await this._roleService.findRoleByName(roleName)
         } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
         }
         return res.status(200).json(result)
    }

    async findAllRoles(req:Request, res:Response){
        let result:RoleOut[]
         try {
              result=await this._roleService.findAllRoles()
         } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
         }
         return res.status(200).json(result)
    }

    async updateRole(req:Request, res:Response){
        let roleId=req.params.roleId
        let request:RoleIn=req.body
        let result
         try {
              result=await this._roleService.updateRole(roleId,request)
         } catch (error) {
            if (isError(error)){
                const err= new AppError(error.message,error.detail, 400)
                 return res.status(err.statusCode).json(err)
             }
             return res.status(500).json(error)
         }
         return res.status(201).json(result)
    }

}