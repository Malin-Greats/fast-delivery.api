import { IRoleService } from "../ports/role-service";
import {Request, Response} from "express"
import { validationResult } from "express-validator";
import AppError, { isError } from "../../shared/errors/error";
import { RoleIn, RoleOut } from "../domain/dto/role/role.dto";
import { ApiResponse } from "../../shared/dto/response";
export class RoleHandler{
    constructor(private _roleService:IRoleService){}

    async createRole(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let request=<RoleIn>req.body
        try {
            apiResponse.data=await this._roleService.createRole(request)
            apiResponse.success = true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors =new AppError(error.message,error.detail, 400)
                return res.status(apiResponse.errors.statusCode).json(apiResponse)
            }
            return res.status(500).json(error)
        }
        return res.status(201).json(apiResponse)
    
    }

    async findRoleById(req:Request, res:Response){
        const apiResponse = new ApiResponse()
       let roleId=<string>req.params.roleId
        try {
            apiResponse.data=await this._roleService.findRoleById(roleId)
            apiResponse.success=true
        } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
         }
        return res.status(200).json(apiResponse)
    }

    async findRoleByName(req:Request, res:Response){
        const apiResponse =new ApiResponse()
        let roleName:string=req.params.roleName
         try {
            apiResponse.data=await this._roleService.findRoleByName(roleName)
            apiResponse.success =true
         } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
         }
         return res.status(200).json(apiResponse)
    }

    async findAllRoles(req:Request, res:Response){
        const apiResponse = new ApiResponse()
         try {
            apiResponse.data=await this._roleService.findAllRoles()
            apiResponse.success=true
         } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
         }
         return res.status(200).json(apiResponse)
    }

    async updateRole(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let roleId=req.params.roleId
        let request:RoleIn=req.body
         try {
            apiResponse.data=await this._roleService.updateRole(roleId,request)
            apiResponse.success=true
         } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
         }
         return res.status(201).json(apiResponse)
    }

    async deleteRole(req:Request, res:Response){
        const apiResponse = new ApiResponse()
        let roleId=req.params.roleId
         try {
            apiResponse.data=await this._roleService.deleteRole(roleId)
            apiResponse.success=true
         } catch (error) {
            if (isError(error)){
                apiResponse.errors= new AppError(error.message,error.detail, 400)
                 return res.status(apiResponse.errors.statusCode).json(apiResponse)
             }
             return res.status(500).json(error)
         }
         return res.status(204).json(apiResponse)
    }

}