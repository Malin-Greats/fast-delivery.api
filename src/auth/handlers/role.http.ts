import {Request, Response} from "express"
import { validationResult } from "express-validator";
import { RoleIn } from "../dto/role/create-role.dto";
import { RoleOut } from "../dto/role/get-role.dto";
import { IRolService } from "../ports/role-service.port";

export class RoleHandler{

    constructor(private _roleService:IRolService){}

    async createRole(req:Request, res:Response){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let request:RoleIn=req.body
        let result!:RoleOut
        try {
             result=await this._roleService.createRole(request)
        } catch (error) {
            return res.status(400).send(error)
        }
        return res.status(201).json(result)
    
    }

    async findRoleById(req:Request, res:Response){
       let roleId:string=req.params.roleId
       let result:RoleOut
        try {
             result=await this._roleService.findRoleById(roleId)
        } catch (error) {
            return res.status(400).send(error)
        }
        return res.status(200).json(result)
    }
    async findRoleByName(req:Request, res:Response){
        let roleName:string=req.params.roleName
        let result:RoleOut
         try {
              result=await this._roleService.findRoleByName(roleName)
         } catch (error) {
             return res.status(400).send(error)
         }
         return res.status(200).json(result)
    }

    async findAllRoles(req:Request, res:Response){
        let result:RoleOut[]
         try {
              result=await this._roleService.findAllRoles()
         } catch (error) {
             return res.status(400).send(error)
         }
         return res.status(200).json(result)
    }

    async updateRole(req:Request, res:Response){
        let roleId=req.params.roleId
        let request:RoleIn=req.body
        let result:RoleOut
         try {
              result=await this._roleService.updateRole(roleId,request)
         } catch (error) {
             return res.status(400).send(error)
         }
         return res.status(201).json(result)
    }

}